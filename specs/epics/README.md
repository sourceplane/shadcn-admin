# Epics

Orun-style work programs. Each epic is a folder carrying `epic.yaml` (the
declaration the platform reads: slug, key prefix, milestones with exit
criteria and task keys) beside its doc set. The pull request that adds the
folder is the adoption; the merge creates the epic in the workspace.

| Epic | Cluster | Status | What it is |
|------|---------|--------|------------|
| [`shadcn-admin/`](./shadcn-admin/) | **SA** | ✅ Shipped (`baseline-v1`); not yet live | Vercel's Next.js & shadcn/ui Admin Dashboard — Studio Admin — on Cloudflare Workers + Static Assets through OpenNext, inside Workers Free with its fonts self-hosted, and an Orun baseline that instantiates it (SA2) |

As-built ≠ intent: what shipped lives in each epic's `IMPLEMENTATION-STATUS.md`.
