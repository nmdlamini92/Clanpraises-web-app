// app/og/[id]/route.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch clan praise info
  const clanpraise = await fetch(`${process.env.API_URL}/headers/${id}`).then(res => res.json());

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f5f5",
          fontSize: 64,
          fontWeight: "bold",
          color: "#1f2937",
          textAlign: "center",
          padding: "50px",
        }}
      >
        <div>{clanpraise.title}</div>
        <div style={{ fontSize: 36, marginTop: 20 }}>{clanpraise.body.slice(0, 100)}…</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
