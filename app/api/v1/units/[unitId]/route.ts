import UnitModel from "@/models/unit";
import { NextRequest } from "next/server";

type Context = {
  unitId: number;
};

export async function PUT(request: Request, context: { params: Context }) {
  const Unit = new UnitModel();
  const data = await request.json();

  try {
    const unit = await Unit.updateUnit(context.params.unitId, data);

    return Response.json(unit, { status: 206 });
  } catch (error) {
    console.error(error);
    return Response.json({ err: error }, { status: 409 });
  }
}

export async function DELETE(_: NextRequest, context: { params: Context }) {
  const Unit = new UnitModel();
  try {
    const unit = await Unit.deleteUnit(context.params.unitId);

    return Response.json(unit, { status: 206 });
  } catch (error) {
    console.error(error);
    return Response.json({ err: error }, { status: 409 });
  }
}
