import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Prisma } from "@prisma/client";

const SERVICE_TYPES = [
  "installation",
  "maintenance",
  "repair",
  "water-testing",
  "consultation",
];

const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;
const parseDateOnly = (value: string | null) => {
  if (!value) return null;
  const parts = value.split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
  const [year, month, day] = parts;
  return new Date(year, month - 1, day);
};
const startOfToday = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

// POST - Book an appointment
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!prisma) {
      return NextResponse.json(
        { error: "Database unavailable during build" },
        { status: 503 }
      );
    }

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

    const normalizedServiceType = serviceType?.toLowerCase();

    if (!serviceType || !date || !timeSlot || !firstName || !lastName || !email || !phone || !address) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    if (!normalizedServiceType || !SERVICE_TYPES.includes(normalizedServiceType)) {
      return NextResponse.json(
        { error: "Invalid service type" },
        { status: 400 }
      );
    }

    const parsedDate = parseDateOnly(date);
    if (!parsedDate || Number.isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date" },
        { status: 400 }
      );
    }

    const appointmentDate = parsedDate;
    const todayStart = startOfToday();

    if (appointmentDate < todayStart) {
      return NextResponse.json(
        { error: "Cannot book appointments in the past" },
        { status: 400 }
      );
    }

    if (!TIME_PATTERN.test(timeSlot)) {
      return NextResponse.json(
        { error: "Time slot must be in HH:MM format" },
        { status: 400 }
      );
    }

    // Create appointment using transaction
    const result = await prisma.$transaction(async (tx) => {
      const slot = await tx.appointmentSlot.findFirst({
        where: {
          date: appointmentDate,
          startTime: { lte: timeSlot },
          endTime: { gt: timeSlot },
          isAvailable: true,
          OR: [
            { serviceTypes: { isEmpty: true } },
            { serviceTypes: { has: normalizedServiceType } },
            { serviceTypes: { has: serviceType } }, // legacy casing support
          ],
        },
        orderBy: [{ startTime: "asc" }],
      });

      if (!slot || slot.bookedCount >= slot.maxBookings) {
        throw new Error("SLOT_FULL");
      }

      const updated = await tx.appointmentSlot.updateMany({
        where: {
          id: slot.id,
          bookedCount: { lt: slot.maxBookings },
        },
        data: {
          bookedCount: {
            increment: 1,
          },
        },
      });

      if (updated.count === 0) {
        throw new Error("SLOT_FULL");
      }

      const appointment = await tx.appointment.create({
        data: {
          userId: session?.user?.id,
          serviceType: normalizedServiceType,
          date: appointmentDate,
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

      return appointment;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "SLOT_FULL") {
      return NextResponse.json(
        { error: "Selected time slot is no longer available" },
        { status: 400 }
      );
    }

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

    if (!prisma) {
      return NextResponse.json(
        { error: "Database unavailable during build" },
        { status: 503 }
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
