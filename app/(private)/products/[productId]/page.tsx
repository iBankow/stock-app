import ProductModel from "@/models/product";
import { ProductStockCharts } from "./_components/charts";
import type { Metadata } from "next";

interface ProductPageProps {
  params: {
    productId: number;
  };
}

async function getData(productId: string | number) {
  const Product = new ProductModel();

  const product = await Product.getProductById(Number(productId));

  return product;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { productId } = params;

  const product = await getData(productId);

  return { title: product.name };
}

export default async function PageProduct({ params }: ProductPageProps) {
  const { productId } = params;

  const data = await getData(productId);

  return (
    <div className="container relative py-10">
      <ProductStockCharts stock={data.product_stock} />
    </div>
  );
}
