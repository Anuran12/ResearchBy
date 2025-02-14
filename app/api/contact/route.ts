import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { firstName, lastName, email, subject, message } = data;

    const htmlBody = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    const params = {
      Source: "noreply@researchby.ai",
      Destination: {
        ToAddresses: ["support@researchby.ai"],
      },
      Message: {
        Subject: {
          Data: `Contact Form: ${subject}`,
        },
        Body: {
          Html: {
            Data: htmlBody,
          },
        },
      },
    };

    const command = new SendEmailCommand(params);
    await sesClient.send(command);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
