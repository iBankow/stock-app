import ProductModel from "@/models/product";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams: any = Object.fromEntries(
    new URLSearchParams(request.nextUrl.searchParams),
  );
  const Product = new ProductModel();

  const products = await Product.getAllProducts(searchParams);

  return Response.json(products);
}

export async function POST(request: Request) {
  const data = await request.json();
  const Product = new ProductModel();

  try {
    const product = await Product.createProduct(data);

    return Response.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ err: error }, { status: 409 });
  }
}
