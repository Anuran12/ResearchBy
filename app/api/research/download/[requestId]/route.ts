import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get requestId from the URL
    const requestId = request.nextUrl.pathname.split("/").pop();

    const response = await fetch(
      `http://ec2-54-177-139-194.us-west-1.compute.amazonaws.com:3000/api/research/download/${requestId}`
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
