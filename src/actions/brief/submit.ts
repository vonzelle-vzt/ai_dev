"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { z } from "zod"
import { slugify } from "@/lib/utils"

const briefSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(10).max(5000),
  referenceUrls: z.array(z.string().url().or(z.literal(""))).max(5).optional(),
  selectedFeatures: z.array(z.string()),
  customFeatures: z.string().max(2000).optional(),
  stylePreference: z.string().optional(),
  primaryColor: z.string().optional(),
  integrationNotes: z.string().max(2000).optional(),
  complexityScore: z.number().min(0).max(10).optional(),
  estimatedDays: z.number().min(1).max(30).optional(),
})

export async function submitBrief(input: z.infer<typeof briefSchema>) {
  const { orgId } = await auth()
  if (!orgId) throw new Error("Not authenticated")

  const org = await db.organization.findUnique({
    where: { clerkOrgId: orgId },
    include: { projects: { where: { status: { notIn: ["COMPLETED", "CANCELLED"] } } } },
  })
  if (!org) throw new Error("Organization not found")

  if (org.projects.length >= org.maxActiveProjects) {
    throw new Error("Active project limit reached. Upgrade your plan or wait for a project to complete.")
  }

  const data = briefSchema.parse(input)
  const slug = slugify(data.name)

  const project = await db.project.create({
    data: {
      orgId: org.id,
      name: data.name,
      slug,
      status: "BRIEF_SUBMITTED",
      brief: {
        description: data.description,
        customFeatures: data.customFeatures,
        integrationNotes: data.integrationNotes,
      },
      referenceUrls: data.referenceUrls?.filter(Boolean) || [],
      stylePreference: data.stylePreference,
      primaryColor: data.primaryColor,
      complexityScore: data.complexityScore,
      estimatedDays: data.estimatedDays,
      submittedAt: new Date(),
    },
  })

  // Create feature records
  if (data.selectedFeatures.length > 0) {
    await db.projectFeature.createMany({
      data: data.selectedFeatures.map(featureId => ({
        projectId: project.id,
        category: "CUSTOM",
        name: featureId,
        description: "",
        isCustom: false,
        complexity: 2,
      })),
    })
  }

  return project
}

export async function saveBriefDraft(projectId: string, stepData: Record<string, unknown>, currentStep: number) {
  const { orgId } = await auth()
  if (!orgId) throw new Error("Not authenticated")

  const org = await db.organization.findUnique({ where: { clerkOrgId: orgId } })
  if (!org) throw new Error("Organization not found")

  await db.project.update({
    where: { id: projectId, orgId: org.id },
    data: {
      brief: stepData as any,
      currentWizardStep: currentStep,
    },
  })
}
