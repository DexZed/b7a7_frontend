import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  type BarRectangleItem,
  type CartesianLayout,
  type AnimationInterpolateFn,
  type TooltipContentProps,
  usePlotArea,
  useActiveTooltipDataPoints,
  ZIndexLayer,
  DefaultZIndexes,
} from "recharts";
import {
  generateMockData,
  RechartsDevtools,
  type MockDataType,
} from "@recharts/devtools";
type Props = {
  data: {
    x: string;
    [key: string]: number | string;
  }[];
  yDataKey: string;
  width?: number;
};

type AnimatedBarRectangleItem = BarRectangleItem & { opacity?: number };

const staggeredCrossfade: AnimationInterpolateFn<
  BarRectangleItem,
  CartesianLayout
> = (items, animationElapsedTime) => {
  if (items == null) return [];
  if (animationElapsedTime === 1)
    return items.flatMap((item) =>
      item.status === "removed" ? [] : [item.next],
    );
  const count = items.length;
  const result: AnimatedBarRectangleItem[] = [];
  items.forEach((item, index) => {
    if (item.status === "matched" || item.status === "added") {
      const delay = index / count;
      const progress = Math.max(
        0,
        Math.min(1, (animationElapsedTime - delay) / (1 - delay)),
      );
      result.push({ ...item.next, opacity: progress });
    }
    if (item.status === "matched" || item.status === "removed") {
      const reverseIndex = count - 1 - index;
      const delay = reverseIndex / count;
      const progress = Math.max(
        0,
        Math.min(1, (animationElapsedTime - delay) / (1 - delay)),
      );
      result.push({ ...item.prev, opacity: 1 - progress });
    }
  });
  return result;
};

function CustomTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || payload == null || payload.length === 0) {
    return null;
  }

  const entry = payload[0];
  const point = entry?.payload;

  return (
    <div className="aura aura-dual">
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="text-md font-bold">
              {label}: {entry?.value}
            </h2>
            <span className="text-md">{point?.note}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * `usePlotArea` reports where the drawable area sits after axes and legends
 * have taken their space, so custom elements can position themselves against it.
 */
function PlotAreaFrame() {
  const plotArea = usePlotArea();

  if (plotArea == null) {
    return null;
  }

  return (
    <rect {...plotArea} fill="none" stroke="#64748b" strokeDasharray="4 4" />
  );
}

/**
 * Chart state is available to any component inside the chart, so you can render
 * your own readouts without going through Tooltip at all.
 */
function ActiveReadout() {
  const plotArea = usePlotArea();
  const activePoints = useActiveTooltipDataPoints<MockDataType>();
  const point = activePoints?.[0];

  if (plotArea == null || point == null) {
    return null;
  }

  return (
    // Position the element above Tooltip cursor so that it's not covered behind it
    <ZIndexLayer zIndex={DefaultZIndexes.cursorRectangle + 1}>
      <text
        x={plotArea.x + 10}
        y={plotArea.y + 22}
        fill="#0ea5e9"
        fontSize={16}
        fontWeight={700}
      >
        {point.x}: {point.y}
      </text>
    </ZIndexLayer>
  );
}

export default function NeedlesslyComplicatedBarChart({
  width,
  data,
  yDataKey,
}: Props) {
  const chartData = data ?? generateMockData(6, 823);
  return (
    <BarChart
      style={{
        width: width ?? "100%",
        maxWidth: "1000px",
        maxHeight: "100vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={chartData}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid vertical={false} opacity={0.5} />
      <XAxis dataKey="x" tickLine={false} axisLine={false} />
      <YAxis width="auto" tickLine={false} axisLine={false} />
      <Tooltip content={CustomTooltip} />
      <Legend
        wrapperStyle={{
          backgroundColor: "Canvas",
          border: "1px solid CanvasText",
          borderRadius: 4,
          paddingTop: 4,
          paddingBottom: 4,
        }}
        labelStyle={{
          color: "CanvasText",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
        iconType="circle"
      />
      <Bar
        dataKey={yDataKey}
        radius={[1, 1, 0, 0]}
        animationDuration={1000}
        animationInterpolateFn={staggeredCrossfade}
        fill="#F7F2EB"
        stroke="#2B2B2B"
        strokeWidth={2}
        barSize={30}
      />
      <PlotAreaFrame />
      <ActiveReadout />
      <RechartsDevtools />
    </BarChart>
  );
}
