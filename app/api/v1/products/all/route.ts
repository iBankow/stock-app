import { auth } from "@/auth";
import ProductModel from "@/models/product";
import { NextResponse } from "next/server";

export const GET = auth(async (request) => {
  if (!request.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const searchParams: any = Object.fromEntries(
    new URLSearchParams(request.nextUrl.searchParams),
  );
  const Product = new ProductModel();

  if (searchParams.q) {
    const products = await Product.query().whereILike(
      "products.name",
      `%${searchParams.q}%`,
    );

    return Response.json(products);
  }

  const products = await Product.query()
    .with(
      "ranked",
      Product.raw(
        `SELECT *, ROW_NUMBER() OVER (PARTITION BY LEFT(name, 1) ORDER BY name) AS rank FROM products`,
      ),
    )
    .select("*")
    .from("ranked")
    .where("rank", "<=", 3)
    .orderBy("name");

  return Response.json(products);
});
