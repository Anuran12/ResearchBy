import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { requestId: string } }
) {
  try {
    const response = await fetch(
      `http://ec2-54-177-139-194.us-west-1.compute.amazonaws.com:3000/api/research/download/${params.requestId}`
    );
    const contentType = response.headers.get("content-type");
    const blob = await response.blob();

    return new NextResponse(blob, {
      headers: {
        "Content-Type": contentType || "application/octet-stream",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to download" }, { status: 500 });
  }
}
