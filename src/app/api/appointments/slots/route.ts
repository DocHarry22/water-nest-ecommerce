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
const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// GET - Fetch available appointment slots
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const serviceTypeParam = searchParams.get("serviceType");
    const normalizedServiceType = serviceTypeParam?.toLowerCase();
    const startDateObj = parseDateOnly(startDate);
    const endDateObj = parseDateOnly(endDate);

    if (
      (startDate && !startDateObj) ||
      (endDate && !endDateObj)
    ) {
      return NextResponse.json(
        { error: "Invalid date range" },
        { status: 400 }
      );
    }

    if (normalizedServiceType && normalizedServiceType !== "all" && !SERVICE_TYPES.includes(normalizedServiceType)) {
      return NextResponse.json(
        { error: "Invalid service type" },
        { status: 400 }
      );
    }

    const where: Prisma.AppointmentSlotWhereInput = {
      isAvailable: true,
    };

    if (startDateObj || endDateObj) {
      where.date = {
        ...(startDateObj ? { gte: startDateObj } : {}),
        ...(endDateObj ? { lte: endDateObj } : {}),
      };
    }

    if (normalizedServiceType && normalizedServiceType !== "all") {
      where.OR = [
        // Match normalized service type and legacy-cased values
        { serviceTypes: { has: normalizedServiceType } },
        serviceTypeParam ? { serviceTypes: { has: serviceTypeParam } } : undefined,
        { serviceTypes: { isEmpty: true } }, // Empty means available for all services
      ].filter(Boolean) as Prisma.AppointmentSlotWhereInput["OR"];
    }

    if (!prisma) {
      return NextResponse.json(
        { error: "Database unavailable during build" },
        { status: 503 }
      );
    }

    const slots = await prisma.appointmentSlot.findMany({
      where,
      orderBy: [
        { date: "asc" },
        { startTime: "asc" },
      ],
    });

    // Filter out fully booked slots
    const availableSlots = slots.filter(slot => slot.bookedCount < slot.maxBookings);

    return NextResponse.json({ slots: availableSlots });
  } catch (error) {
    console.error("Fetch appointment slots error:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointment slots" },
      { status: 500 }
    );
  }
}

// POST - Create new appointment slot (Admin/Staff only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "STAFF")) {
      return NextResponse.json(
        { error: "Unauthorized - Admin or Staff access required" },
        { status: 403 }
      );
    }

    if (!prisma) {
      return NextResponse.json(
        { error: "Database unavailable during build" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { date, startTime, endTime, maxBookings, serviceTypes, notes } = body;
    const normalizedServiceTypes = Array.isArray(serviceTypes)
      ? serviceTypes
          .map((type: string) => type.toLowerCase())
          .filter((type: string) => SERVICE_TYPES.includes(type))
      : [];

    const parsedDate = parseDateOnly(date);
    const startValid = typeof startTime === "string" && TIME_PATTERN.test(startTime);
    const endValid = typeof endTime === "string" && TIME_PATTERN.test(endTime);

    if (!parsedDate || Number.isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date" },
        { status: 400 }
      );
    }

    if (!startValid || !endValid) {
      return NextResponse.json(
        { error: "Start time and end time must be in HH:MM format" },
        { status: 400 }
      );
    }

    const startMinutes = toMinutes(startTime);
    const endMinutes = toMinutes(endTime);

    if (startMinutes >= endMinutes) {
      return NextResponse.json(
        { error: "End time must be after start time" },
        { status: 400 }
      );
    }

    const todayStart = startOfToday();
    const slotDate = parsedDate;

    if (slotDate < todayStart) {
      return NextResponse.json(
        { error: "Cannot create slots in the past" },
        { status: 400 }
      );
    }

    const maxBookingsValue = Number(maxBookings ?? 1);

    if (!Number.isInteger(maxBookingsValue) || maxBookingsValue < 1 || maxBookingsValue > 20) {
      return NextResponse.json(
        { error: "Max bookings must be an integer between 1 and 20" },
        { status: 400 }
      );
    }

    if (
      Array.isArray(serviceTypes) &&
      serviceTypes.length > 0 &&
      normalizedServiceTypes.length === 0
    ) {
      return NextResponse.json(
        { error: "At least one valid service type is required when provided" },
        { status: 400 }
      );
    }

    if (!date || !startTime || !endTime) {
      return NextResponse.json(
        { error: "Date, start time, and end time are required" },
        { status: 400 }
      );
    }

    // Check for overlapping slots
    const existingSlots = await prisma.appointmentSlot.findMany({
      where: {
        date: slotDate,
        AND: [
          { startTime: { lt: endTime } },
          { endTime: { gt: startTime } },
        ],
      },
    });

    if (existingSlots.length > 0) {
      return NextResponse.json(
        { error: "Time slot overlaps with existing slot" },
        { status: 400 }
      );
    }

    const slot = await prisma.appointmentSlot.create({
      data: {
        date: slotDate,
        startTime,
        endTime,
        maxBookings: maxBookingsValue,
        serviceTypes: normalizedServiceTypes,
        createdBy: session.user.id,
        notes,
      },
    });

    return NextResponse.json(slot, { status: 201 });
  } catch (error) {
    console.error("Create appointment slot error:", error);
    return NextResponse.json(
      { error: "Failed to create appointment slot" },
      { status: 500 }
    );
  }
}

// DELETE - Remove appointment slot (Admin/Staff only)
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "STAFF")) {
      return NextResponse.json(
        { error: "Unauthorized - Admin or Staff access required" },
        { status: 403 }
      );
    }

    if (!prisma) {
      return NextResponse.json(
        { error: "Database unavailable during build" },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const slotId = searchParams.get("id");

    if (!slotId) {
      return NextResponse.json(
        { error: "Slot ID is required" },
        { status: 400 }
      );
    }

    // Check if slot has any bookings
    const slot = await prisma.appointmentSlot.findUnique({
      where: { id: slotId },
    });

    if (!slot) {
      return NextResponse.json(
        { error: "Slot not found" },
        { status: 404 }
      );
    }

    if (slot.bookedCount > 0) {
      return NextResponse.json(
        { error: "Cannot delete slot with existing bookings" },
        { status: 400 }
      );
    }

    await prisma.appointmentSlot.delete({
      where: { id: slotId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete appointment slot error:", error);
    return NextResponse.json(
      { error: "Failed to delete appointment slot" },
      { status: 500 }
    );
  }
}
