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
    const { fullName, email, phone, idNumber, reason } = body;

    // Check for active orders
    const activeOrders = await prisma.order.count({
      where: {
        user: {
          email: email,
        },
        status: {
          in: ["PENDING", "PROCESSING", "SHIPPED"],
        },
      },
    });

    if (activeOrders > 0) {
      return NextResponse.json(
        { error: "You have active orders. Please wait for them to be completed before requesting deletion." },
        { status: 400 }
      );
    }

    // Create deletion request
    // @ts-expect-error - Prisma client regenerated, TypeScript server needs reload
    const dataRequest = await prisma.dataRightsRequest.create({
      data: {
        type: "DELETION",
        fullName,
        email,
        phone: phone || null,
        idNumber,
        additionalInfo: reason || null,
        status: "PENDING",
      },
    });

    // Send confirmation email
    if (resend) {
      try {
        await resend.emails.send({
          from: "Water Nest <noreply@waternest.co.za>",
          to: email,
          subject: "Data Deletion Request Received - Water Nest",
          html: `
            <h2>Data Deletion Request Received</h2>
            <p>Dear ${fullName},</p>
            <p>We have received your request to delete your personal data. Your request reference number is: <strong>${dataRequest.id}</strong></p>
            <p><strong>Important Information:</strong></p>
            <ul>
              <li>We will verify your identity within 24 hours</li>
              <li>Your data will be permanently deleted within 30 days</li>
              <li>Your account will be closed</li>
              <li>Some data may be retained for legal/accounting purposes (5 years)</li>
            </ul>
            <p><strong>You have 7 days to cancel this request.</strong> After that, the deletion will be processed and cannot be reversed.</p>
            <p>If you have any questions or wish to cancel, please contact privacy@waternest.co.za</p>
            <p>Best regards,<br>Water Nest Data Protection Team</p>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
      }
    }

    // Notify admin
    if (resend) {
      try {
        await resend.emails.send({
          from: "Water Nest <noreply@waternest.co.za>",
          to: "privacy@waternest.co.za",
          subject: `⚠️ Data Deletion Request - ${dataRequest.id}`,
          html: `
            <h2>New Data Deletion Request</h2>
            <p><strong>Request ID:</strong> ${dataRequest.id}</p>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "N/A"}</p>
            <p><strong>ID (Last 4):</strong> ${idNumber}</p>
            <p><strong>Reason:</strong> ${reason || "Not provided"}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Action Required:</strong></p>
            <ol>
              <li>Verify identity within 24 hours</li>
              <li>Process deletion within 30 days</li>
              <li>Ensure legal retention requirements are met</li>
            </ol>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send admin notification:", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      requestId: dataRequest.id,
      message: "Deletion request submitted successfully",
    });
  } catch (error) {
    console.error("Error creating deletion request:", error);
    return NextResponse.json(
      { error: "Failed to submit request" },
      { status: 500 }
    );
  }
}
