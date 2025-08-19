import { Box, Typography, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import {
  Area,
  ComposedChart,
  LabelProps,
  Line,
  ResponsiveContainer,
  // Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { YearSelect } from "../../../components/common/YearSelect/YearSelect";
import { CustomizedAxisTick } from "../../../components/ui/ChartComponents";
import { currentYear } from "../../../const/monthsOfYear";
import { useGetTourismOverview } from "../../../hooks/useTourism";

interface ChartDataType {
  month: string | number;
  tourists: number;
  profit: number;
}

interface CustomizedLabelProps extends LabelProps {
  data: ChartDataType[];
  index: number;
}

const CustomizedLabel = React.memo<CustomizedLabelProps>(
  ({ x, y, index, data }) => {
    const item = data[index];
    // const isLast = index === data.length - 1;

    return (
      <text
        x={x}
        y={y}
        dy={-15}
        // textAnchor={isLast ? "end" : "start"}
        textAnchor="middle"
        fill="#00BAD1"
        fontSize={13}
        fontWeight="bold"
      >
        <tspan x={x} dy="-40">
          Туристы: {item.tourists}
        </tspan>
        <tspan x={x} dy="20">
          Прибыль: {item.profit}$
        </tspan>
      </text>
    );
  }
);

interface Props {
  years: number[];
}

function ChartCard({ years }: Props) {
  const theme = useTheme();
  const [year, setYear] = useState(currentYear);
  const { data = [] } = useGetTourismOverview(Number(year));

  const totalTourists = useMemo(
    () => data.reduce((sum, d) => sum + d.tourists, 0),
    [data]
  );
  const totalProfit = useMemo(
    () => data.reduce((sum, d) => sum + d.profit, 0),
    [data]
  );

  return (
    <Box
      className="shadow-xl rounded-2xl my-5"
      sx={{
        bgcolor: "background.paper",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <header className="flex justify-between items-start m-10">
        <Box className="flex gap-10">
          <Box>
            <p className="text-gray-400">Общее количество Туристов</p>
            <Typography variant="h6">{totalTourists}</Typography>
            <p className="text-gray-400">
              <span className="text-green-500 text-xl">0%</span> за последний
              год
            </p>
          </Box>
          <Box>
            <p className="text-gray-400">Общий доход от Туристов</p>
            <Typography variant="h6" className="text-[#355CBF]">
              {totalProfit} $
            </Typography>
            <p className="text-gray-400">
              <span className="text-green-500 text-xl">0%</span> за последний
              месяц
            </p>
          </Box>
        </Box>
        <YearSelect onChange={setYear} value={year} years={years} />
      </header>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={data}
          margin={{ top: 30, right: 55, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorguests" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8884d8" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="monthLabel"
            tick={<CustomizedAxisTick />}
            type="category"
            interval={0}
          />

          <YAxis
            type="number"
            domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.25)]}
          />
          <Area
            type="linear"
            dataKey="tourists"
            stroke="#8884d8"
            fill="url(#colorguests)"
          />
          {/* <Tooltip
            formatter={(value, name) =>
              name === "tourists"
                ? [`${value}`, "Туристы"]
                : [`${value}$`, "Прибыль"]
            }
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              borderColor: theme.palette.divider,
              fontSize: 15,
            }}
          /> */}
          <Line
            // isAnimationActive={false}
            strokeWidth={3}
            type="linear"
            dataKey="tourists"
            stroke="#00BAD1"
            dot={{ r: 5 }}
            label={({ x, y, index }) => (
              <CustomizedLabel x={x!} y={y!} index={index!} data={data} />
            )}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default ChartCard;
