import { Box, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import YearMenu from "../../../../components/common/YearMenu/YearMenu";
import { useGetPopulationAgeGender } from "../../../../hooks/useHome";
import { formatCompactNumber } from "../../../../utils/formatCompactNumber";

function GenderAgeCard() {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const theme = useTheme();

  const { data } = useGetPopulationAgeGender();

  const chartData =
    data?.[String(selectedYear)]?.map((item) => ({
      name: item.age_group.replace(/^до\s*/, "> ").replace(/^от\s*/, "< "),
      men: item.mens,
      women: item.womens,
      total: item.womens + item.mens,
    })) ?? [];

  const { totalMen, totalWomen } = useMemo(() => {
    return chartData.reduce(
      (acc, item) => ({
        totalMen: acc.totalMen + item.men,
        totalWomen: acc.totalWomen + item.women,
      }),
      { totalMen: 0, totalWomen: 0 }
    );
  }, [chartData]);

  return (
    <Box
      className="shadow-xl rounded-2xl p-1.5 flex flex-col justify-between"
      sx={{
        bgcolor: "background.paper",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <div className="flex justify-between items-center gap-3 !mb-2">
        <Typography variant="body2" fontWeight="bold">
          Аҳоли сони ёш кесимида
        </Typography>

        <YearMenu
          onChange={setSelectedYear}
          selectedYear={selectedYear}
          className="self-start"
        />
      </div>

      <ResponsiveContainer height={130}>
        <BarChart data={chartData} barCategoryGap={"38%"}>
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            fontSize={12}
          />
          <YAxis hide />
          <Tooltip
            formatter={(value: number, name: string) => [
              formatCompactNumber(value),
              name === "men" ? "Эркаклар" : "Аёллар",
            ]}
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              borderColor: theme.palette.divider,
              fontSize: 12,
            }}
          />

          {/* Аёллар */}

          <Bar dataKey="women" stackId="a" fill="#D50000"></Bar>

          {/* Мужчины */}
          <Bar dataKey="men" stackId="a" fill="#2196F3">
            <LabelList
              fontSize={12}
              dataKey="total"
              position="top"
              formatter={(value: number) =>
                value >= 1000 ? (value / 1000).toFixed(1) + "K" : value
              }
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <Box mt={1} display="flex" justifyContent="center" gap={4}>
        <Box display="flex" alignItems="center" gap={1}>
          <Box width={12} height={12} borderRadius="50%" bgcolor="#2196F3" />
          <Typography variant="caption" fontWeight="bold">
            Эркаклар: {totalMen.toLocaleString()}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box width={12} height={12} borderRadius="50%" bgcolor="#D50000" />
          <Typography variant="caption" fontWeight="bold">
            Аёллар: {totalWomen.toLocaleString()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default GenderAgeCard;
