import ProductHistoriesModel from "@/models/product_histories";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams: any = Object.fromEntries(
    new URLSearchParams(request.nextUrl.searchParams),
  );
  const ProductHistories = new ProductHistoriesModel();

  const productHistories =
    await ProductHistories.getProductHistories(searchParams);

  return Response.json(productHistories);
}

export async function POST(request: Request) {
  const ProductHistories = new ProductHistoriesModel();
  const data = await request.json();

  try {
    await ProductHistories.createProductHistories(data);
    return Response.json(true, { status: 201 });
  } catch (error: any) {
    return Response.json(
      error && error.message ? error.message : "Algo inesperado ocorreu",
      { status: 406 },
    );
  }
}
