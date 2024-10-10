import { getAllUnits } from "@/models/unit";

export async function GET({ headers }: Request) {
  const page = Number(headers.get("page")) || 1;
  const perPage = Number(headers.get("perPage")) || 10;

  const units = await getAllUnits({ page, perPage });

  console.log('api a', units)

  return Response.json(units);
}
