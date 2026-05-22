import type { Product } from "@/types/product";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PackagePlus, TrendingUp } from "lucide-react";

interface ProductChartProps {
  data: Product[];
}

const ProductChart = ({ data }: ProductChartProps) => {
  const monthMap: { [month: string]: number } = {};

  const totalProductsAdded = data.length;

  for (const product of data) {
    const month = new Date(product.createdAt).toLocaleString("default", {
      month: "short",
      day: "2-digit",
    });

    if (!monthMap[month]) monthMap[month] = 0;

    monthMap[month] = (monthMap[month] || 0) + 1;
  }

  const chartData = Object.entries(monthMap).map(([month, count]) => {
    return { month, count };
  });

  const chartConfig = {
    date: {
      label: "Date",
      color: "#2563eb",
    },
    count: {
      label: "Count",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="border-b px-6 py-5">
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <PackagePlus className="size-5" />
            </div>
            <div className="min-w-0">
              <CardTitle className="truncate text-lg font-semibold">
                Product Growth
              </CardTitle>
              <CardDescription>
                Products added to your catalog each month
              </CardDescription>
            </div>
          </div>

          <div className="flex min-h-20 min-w-38 flex-col items-center justify-center rounded-md border bg-muted/30 px-4 py-3 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
              <TrendingUp className="size-3.5" />
              Total Added
            </div>
            <div className="mt-1 text-2xl font-semibold leading-none tabular-nums">
              {totalProductsAdded.toLocaleString()}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-96 w-full">
          <AreaChart data={chartData} accessibilityLayer>
            <XAxis dataKey={"month"} fill="#2563eb" />
            <YAxis fill="#2563eb" />
            <Tooltip content={<ChartTooltipContent />} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            {/* <ChartLegend content={<ChartLegendContent />} /> */}
            <Area
              dataKey={"count"}
              fill="#60a5fa"
              type={"monotone"}
              stroke="#2563eb"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ProductChart;
