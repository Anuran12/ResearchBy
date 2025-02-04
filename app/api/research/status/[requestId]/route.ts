import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { requestId: string } }
) {
  try {
    const response = await fetch(
      `http://ec2-54-177-139-194.us-west-1.compute.amazonaws.com:3000/api/research/status/${params.requestId}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to get status" },
      { status: 500 }
    );
  }
}
