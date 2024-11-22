import ProductModel from "@/models/product";
import { nullifyBlankProperties } from "@/lib/utils";
import { NextRequest } from "next/server";

type Context = {
  productId: number;
};

export async function GET(_: NextRequest, context: { params: Context }) {
  const Product = new ProductModel();

  try {
    const product = await Product.getProductById(context.params.productId);
    return Response.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ err: error }, { status: 409 });
  }
}

export async function PUT(request: NextRequest, context: { params: Context }) {
  const Product = new ProductModel();
  const data = await request.json();
  nullifyBlankProperties(data);

  try {
    const product = await Product.updateProduct(context.params.productId, data);

    return Response.json(product, { status: 206 });
  } catch (error) {
    console.error(error);
    return Response.json({ err: error }, { status: 409 });
  }
}
