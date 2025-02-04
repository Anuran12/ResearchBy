import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get requestId from the URL
    const requestId = request.nextUrl.pathname.split("/").pop();

    const response = await fetch(
      `http://ec2-54-177-139-194.us-west-1.compute.amazonaws.com:3000/api/research/status/${requestId}`
    );
    const data = await response.json();
    return Response.json(data);
  } catch {
    return Response.json({ error: "Failed to get status" }, { status: 500 });
  }
}
