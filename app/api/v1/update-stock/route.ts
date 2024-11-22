import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

import ProductHistoriesModel from "@/models/product_histories";

export async function GET(request: NextRequest) {
  const searchParams: any = Object.fromEntries(
    new URLSearchParams(request.nextUrl.searchParams),
  );
  const ProductHistories = new ProductHistoriesModel();

  const productHistories =
    await ProductHistories.getProductHistories(searchParams);

  return Response.json(productHistories);
}

export const POST = auth(async function POST(request) {
  if (!request.auth || !request.auth.user?.id) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const ProductHistories = new ProductHistoriesModel();
  const data = await request.json();

  try {
    await ProductHistories.createProductHistories(
      data,
      Number(request.auth.user.id),
    );
    return Response.json(true, { status: 201 });
  } catch (error: any) {
    return Response.json(
      error && error.message ? error.message : "Algo inesperado ocorreu",
      { status: 406 },
    );
  }
});
