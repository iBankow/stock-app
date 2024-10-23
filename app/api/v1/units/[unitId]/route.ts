import { deleteUnit, updateUnit } from "@/models/unit";
import { NextRequest } from "next/server";

type Context = {
  unitId: number;
};

export async function PUT(request: NextRequest, context: { params: Context }) {
  const data = await request.json();

  try {
    const unit = await updateUnit(context.params.unitId, data);

    return Response.json(unit, { status: 206 });
  } catch (error) {
    console.error(error);
    return Response.json({ err: error }, { status: 409 });
  }
}

export async function DELETE(_: NextRequest, context: { params: Context }) {
  try {
    const unit = await deleteUnit(context.params.unitId);

    return Response.json(unit, { status: 206 });
  } catch (error) {
    console.error(error);
    return Response.json({ err: error }, { status: 409 });
  }
}
