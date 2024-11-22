import { auth } from "@/auth";
import { NextResponse } from "next/server";

import UnitModel from "@/models/unit";

export const GET = auth(async (request) => {
  if (!request.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const searchParams: any = Object.fromEntries(
    new URLSearchParams(request.nextUrl.searchParams),
  );
  const Unit = new UnitModel();

  const units = await Unit.getAllUnits(searchParams);

  return Response.json(units);
});

export const POST = auth(async function POST(request) {
  if (!request.auth || !request.auth.user?.id) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const Unit = new UnitModel();
  const data = await request.json();

  try {
    const unit = await Unit.createUnit(data);

    return Response.json(unit, { status: 201 });
  } catch (error: any) {
    return Response.json({ err: error.message }, { status: 409 });
  }
});
