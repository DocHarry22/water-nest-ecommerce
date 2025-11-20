import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Prisma } from "@prisma/client";

// POST - Book an appointment
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();
    
    const {
      serviceType,
      date,
      timeSlot,
      firstName,
      lastName,
      email,
      phone,
      address,
      notes,
    } = body;

    if (!serviceType || !date || !timeSlot || !firstName || !lastName || !email || !phone || !address) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Check if the time slot is still available
    const slots = await prisma.appointmentSlot.findMany({
      where: {
        date: new Date(date),
        startTime: { lte: timeSlot },
        endTime: { gt: timeSlot },
        isAvailable: true,
      },
    });

    const availableSlot = slots.find(slot => slot.bookedCount < slot.maxBookings);

    if (!availableSlot) {
      return NextResponse.json(
        { error: "Selected time slot is no longer available" },
        { status: 400 }
      );
    }

    // Create appointment using transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create appointment
      const appointment = await tx.appointment.create({
        data: {
          userId: session?.user?.id,
          serviceType,
          date: new Date(date),
          timeSlot,
          firstName,
          lastName,
          email,
          phone,
          address,
          notes,
          status: "PENDING",
        },
      });

      // Increment booked count for the slot
      await tx.appointmentSlot.update({
        where: { id: availableSlot.id },
        data: {
          bookedCount: {
            increment: 1,
          },
        },
      });

      return appointment;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Book appointment error:", error);
    return NextResponse.json(
      { error: "Failed to book appointment" },
      { status: 500 }
    );
  }
}

// GET - Fetch user's appointments
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const where: Prisma.AppointmentWhereInput = {};

    // Customers see only their appointments
    if (session.user.role === "CUSTOMER") {
      where.userId = session.user.id;
    }
    // Staff and Admin see all appointments

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: {
        date: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Fetch appointments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
