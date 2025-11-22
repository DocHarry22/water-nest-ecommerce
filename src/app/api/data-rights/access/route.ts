import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  if (!prisma) {
    return NextResponse.json(
      { error: "Database unavailable during build" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { fullName, email, phone, accountEmail, idNumber, additionalInfo } = body;

    // Create data rights request in database
    const dataRequest = await prisma.dataRightsRequest.create({
      data: {
        type: "ACCESS",
        fullName,
        email,
        phone: phone || null,
        accountEmail: accountEmail || null,
        idNumber,
        additionalInfo: additionalInfo || null,
        status: "PENDING",
      },
    });

    // Send confirmation email to user
    if (resend) {
      try {
        await resend.emails.send({
          from: "Water Nest <noreply@waternest.co.za>",
          to: email,
          subject: "Data Access Request Received - Water Nest",
          html: `
            <h2>Data Access Request Received</h2>
            <p>Dear ${fullName},</p>
            <p>We have received your request to access your personal data. Your request reference number is: <strong>${dataRequest.id}</strong></p>
            <p><strong>What happens next:</strong></p>
            <ul>
              <li>We will verify your identity within 24 hours</li>
              <li>Your data report will be prepared within 30 days</li>
              <li>You will receive an email when your report is ready</li>
            </ul>
            <p>If you have any questions, please contact our Information Officer at privacy@waternest.co.za</p>
            <p>Best regards,<br>Water Nest Data Protection Team</p>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
      }
    }

    // Send notification to admin/privacy officer
    if (resend) {
      try {
        await resend.emails.send({
          from: "Water Nest <noreply@waternest.co.za>",
          to: "privacy@waternest.co.za",
          subject: `New Data Access Request - ${dataRequest.id}`,
          html: `
            <h2>New Data Access Request</h2>
            <p><strong>Request ID:</strong> ${dataRequest.id}</p>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "N/A"}</p>
            <p><strong>Account Email:</strong> ${accountEmail || "N/A"}</p>
            <p><strong>ID (Last 4):</strong> ${idNumber}</p>
            <p><strong>Additional Info:</strong> ${additionalInfo || "None"}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            <p>Please process this request within 30 days as required by POPIA.</p>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send admin notification:", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      requestId: dataRequest.id,
      message: "Access request submitted successfully",
    });
  } catch (error) {
    console.error("Error creating access request:", error);
    return NextResponse.json(
      { error: "Failed to submit request" },
      { status: 500 }
    );
  }
}
