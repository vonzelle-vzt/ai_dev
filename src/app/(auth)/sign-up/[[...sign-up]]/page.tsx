import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <SignUp fallbackRedirectUrl="/onboarding" appearance={{ variables: { colorPrimary: "#3b82f6" } }} />
    </div>
  )
}
