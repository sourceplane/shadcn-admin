// The deploy's smoke and the deployment record's probe: the Worker answers.
export const dynamic = "force-dynamic";

export function GET(): Response {
  return Response.json({ ok: true });
}
