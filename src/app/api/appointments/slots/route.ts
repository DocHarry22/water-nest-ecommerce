import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Prisma } from "@prisma/client";

// GET - Fetch available appointment slots
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const serviceType = searchParams.get("serviceType");

    const where: Prisma.AppointmentSlotWhereInput = {
      isAvailable: true,
    };

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (serviceType && serviceType !== "all") {
      where.OR = [
        { serviceTypes: { has: serviceType } },
        { serviceTypes: { isEmpty: true } }, // Empty means available for all services
      ];
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

    const body = await request.json();
    const { date, startTime, endTime, maxBookings, serviceTypes, notes } = body;

    if (!date || !startTime || !endTime) {
      return NextResponse.json(
        { error: "Date, start time, and end time are required" },
        { status: 400 }
      );
    }

    // Check for overlapping slots
    const existingSlots = await prisma.appointmentSlot.findMany({
      where: {
        date: new Date(date),
        OR: [
          {
            AND: [
              { startTime: { lte: startTime } },
              { endTime: { gt: startTime } },
            ],
          },
          {
            AND: [
              { startTime: { lt: endTime } },
              { endTime: { gte: endTime } },
            ],
          },
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
        date: new Date(date),
        startTime,
        endTime,
        maxBookings: maxBookings || 1,
        serviceTypes: serviceTypes || [],
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
