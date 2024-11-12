import { ProductStockCharts } from "./_components/charts";

interface ProductPageProps {
  params: {
    productId: number;
  };
}

async function getData(productId: string | number) {
  const response = await fetch(
    `http://localhost:3000/api/v1/products/` + productId,
  ).then((response) => response.json());

  return response;
}

export default async function PageProduct({ params }: ProductPageProps) {
  const { productId } = params;

  const data = await getData(productId);

  return (
    <div className="container relative py-10">
      <ProductStockCharts stock={data.product_stock}/>
    </div>
  );
}
