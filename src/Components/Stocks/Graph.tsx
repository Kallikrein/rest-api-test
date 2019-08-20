import React, { useMemo } from "react";
import { ResponsiveLine, LineTooltipProps } from "@nivo/line";
import { Stocks } from "store/Stocks";

const display = {
  margin: { top: 60, right: 60, bottom: 70, left: 60 },
  enableGridX: false
} as const;

const axis = {
  yScale: {
    type: "linear",
    min: "auto"
  },
  xFormat: "time: %e %b %y",
  xScale: {
    type: "time",
    format: "native"
  },
  axisBottom: {
    format: "%e/%m",
    legend: "Stocks",
    legendPosition: "middle",
    legendOffset: 46
  }
} as const;

export const mesh = {
  useMesh: true
} as const;
export const slice = {
  enableSlices: "x",
  enableCrosshair: false
} as const;

export const Tooltip: React.FC<LineTooltipProps> = ({ point }) => (
  <div
    style={{
      background: "white",
      padding: "9px 12px"
    }}
  >
    <strong>{point.serieId}</strong>
    <div>
      <strong>{((point.data.x as any) as Date).toLocaleDateString()}</strong>
      :&nbsp;
      {point.data.yFormatted}
    </div>
  </div>
);

const constantStockLineProps = {
  ...display,
  ...axis,
  ...mesh,
  tooltip: Tooltip
};

export const StockGraph: React.FC<{ stocks: Stocks }> = ({ stocks }) => {
  const data = useMemo(
    () => [
      {
        id: "Stocks",
        data: stocks.map(stock => ({
          // x: stock.index,
          y: parseFloat(stock.stocks),
          x: new Date(stock.timestamp)
        }))
      }
    ],
    [stocks]
  );
  return <ResponsiveLine data={data} {...constantStockLineProps} />;
};
