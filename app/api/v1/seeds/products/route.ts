import ProductModel from "@/models/product";
import { faker } from "@faker-js/faker";

function createRandomProduct() {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: Number(faker.commerce.price({ min: 0, max: 350, dec: 0 })),
  };
}

export async function GET() {
  const Product = new ProductModel();

  const [productCount] = await Product.query().count("id");

  if (Number(productCount.count) > 1) {
    return Response.json({ product_count: productCount }, { status: 200 });
  }

  let count = 0;
  while (count < 150) {
    const product = createRandomProduct();
    try {
      await Product.createProduct(product);
      count++;
    } catch (error) {
      console.log(error);
    }
  }

  return Response.json({ ok: "ok", productCount }, { status: 201 });
}
