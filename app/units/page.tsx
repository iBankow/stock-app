import { IPagination } from "@/constants/types";
import { IUnit } from "@/models/unit";

async function getUnits(): Promise<IPagination<IUnit>> {
  const res = await fetch(
    `http://localhost:3000/api/v1/units?page=1&perPage10`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getUnits();

  return (
    <div className="w-full min-h-screen justify-center flex items-center">
      <div className="flex flex-col">
        {data.data.map((unit) => (
          <div key={unit.id}>{unit.name}</div>
        ))}
      </div>
    </div>
  );
}
//insert into units (name, ratio) values ('unidade', '1:1'), ('caixa', '1:10');
