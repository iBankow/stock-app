"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  quantity: {
    label: "Quantidade",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export const ProductStockCharts = ({ stock }: any) => {
  return (
    <ChartContainer config={chartConfig} className="max-h-[200px] w-[300px]">
      <BarChart accessibilityLayer data={stock}>
        <CartesianGrid vertical={false} />
        <ChartTooltip content={<ChartTooltipContent labelFormatter={(label)=> label.slice(0, 10)} />} />
        <Bar dataKey="quantity" fill="var(--color-quantity)" radius={4} />
        <XAxis
          dataKey="created_at"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => new Date(value).toISOString().slice(0, 10)}
        />
      </BarChart>
    </ChartContainer>
  );
};
