# Rollback

## Application (Vercel)
1. Open the project in Vercel → Deployments.
2. Find the last known-good production deployment → ⋯ → **Promote to Production** (or `vercel rollback`).
3. Confirm the site and `/api/webhooks/*` endpoints respond, then revert the offending commit on `main`.

Rollback does not revert the database or env vars; check both if the bad release changed them.

## Database (Prisma)
`prisma/migrations` is configured but currently holds no migration files, so there is nothing to revert today.
Prisma has no automatic down-migrations. If migrations are added:
1. Restore from a backup / point-in-time snapshot, or write a new forward migration that undoes the change.
2. If a migration failed midway: `npx prisma migrate resolve --rolled-back <migration_name>`, fix, then redeploy.
3. Deploy code compatible with both schemas first, so the app rollback above stays safe.
