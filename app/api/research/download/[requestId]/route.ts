import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { requestId: string } }
) {
  try {
    const response = await fetch(
      `http://ec2-54-177-139-194.us-west-1.compute.amazonaws.com:3000/api/research/download/${context.params.requestId}`
    );
    const contentType = response.headers.get("content-type");
    const blob = await response.blob();

    return new Response(blob, {
      headers: {
        "Content-Type": contentType || "application/octet-stream",
      },
    });
  } catch {
    return Response.json({ error: "Failed to download" }, { status: 500 });
  }
}
