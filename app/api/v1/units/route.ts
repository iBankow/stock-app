import UnitModel from "@/models/unit";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams: any = Object.fromEntries(
    new URLSearchParams(request.nextUrl.searchParams)
  );
  const Unit = new UnitModel();

  const units = await Unit.getAllUnits(searchParams);

  return Response.json(units);
}

export async function POST(request: Request) {
  const Unit = new UnitModel();
  const data = await request.json();

  try {
    const unit = await Unit.createUnit(data);

    return Response.json(unit, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ err: error }, { status: 409 });
  }
}
