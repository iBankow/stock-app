import { createUnit, getAllUnits } from "@/models/unit";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page")) || 1;
  const perPage = Number(request.nextUrl.searchParams.get("perPage")) || 10;
  const name = request.nextUrl.searchParams.get("name");

  const units = await getAllUnits({ page, perPage, name });

  return Response.json(units);
}

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const unit = await createUnit(data);

    return Response.json(unit, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ err: error }, { status: 409 });
  }
}
