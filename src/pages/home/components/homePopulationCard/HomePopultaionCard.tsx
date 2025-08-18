import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  CustomizedAxisTick,
  CustomizedLabel,
} from "../../../../components/ui/ChartComponents";
import { useGetDemographyOrder } from "../../../../hooks/useHome";

function getYearRangesFromEnd(years: string[], chunkSize = 5): string[][] {
  const sortedYears = [...years].sort();
  const result: string[][] = [];

  for (let i = sortedYears.length; i > 0; i -= chunkSize) {
    const start = Math.max(i - chunkSize, 0);
    const chunk = sortedYears.slice(start, i);
    if (chunk.length > 1) {
      result.unshift(chunk);
    }
  }
  return result;
}

function HomePopulationCard() {
  const theme = useTheme();
  const { data = [] } = useGetDemographyOrder();

  const years = useMemo(() => {
    if (!data.length) return [];

    return Object.keys(data[0])
      .filter((key) => /^\d{4}$/.test(key))
      .sort();
  }, [data]);

  const { ranges } = useMemo(() => {
    const chunks = getYearRangesFromEnd(years, 5);
    const ranges = chunks.map(
      (chunk) => `${chunk[0]}–${chunk[chunk.length - 1]}`
    );
    return { ranges };
  }, [years]);

  const [selectedRange, setSelectedRange] = useState<string>("");

  useEffect(() => {
    if (ranges.length > 0 && !selectedRange) {
      setSelectedRange(ranges[ranges.length - 1]);
    }
  }, [ranges, selectedRange]);

  const chartData = useMemo(() => {
    if (!selectedRange || !data.length) return [];

    const [start, end] = selectedRange.split("–");

    const populationObj = data[0];

    return years
      .filter((year) => year >= start && year <= end)
      .map((year) => ({
        name: year,
        население: Number(populationObj[year]) || 0,
      }));
  }, [selectedRange, data, years]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <Box
      className="shadow-xl rounded-2xl p-1.5"
      sx={{
        bgcolor: "background.paper",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <div className="flex justify-between mb-2">
        <Typography variant="body2" fontWeight="bold">
          Аҳоли сони ўсиши
        </Typography>

        <Button
          variant="outlined"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          disableFocusRipple
          disableRipple
          sx={{
            border: "none",
            padding: 0,
            textTransform: "none",
            gap: 0,
            whiteSpace: "nowrap",
          }}
        >
          <Box display="flex" alignItems="center" gap={0}>
            {selectedRange}
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          sx={{
            "& .MuiPaper-root": {
              bgcolor: theme.palette.background.default,
            },
          }}
        >
          {ranges.map((range) => (
            <MenuItem
              key={range}
              selected={range === selectedRange}
              onClick={() => {
                setSelectedRange(range);
                setAnchorEl(null);
              }}
            >
              {range}
            </MenuItem>
          ))}
        </Menu>
      </div>

      <ResponsiveContainer width="100%" height={130}>
        <LineChart
          data={chartData}
          margin={{ top: 30, right: 30, left: -30, bottom: 10 }}
        >
          <XAxis
            dataKey="name"
            tick={<CustomizedAxisTick />}
            type="category"
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <YAxis
            type="number"
            domain={["auto", "dataMax"]}
            axisLine={false}
            tickLine={false}
            tick={false}
          />
          <Line
            strokeWidth={4}
            type="monotone"
            dataKey="население"
            stroke="#00BAD1"
            dot={{ r: 5 }}
            label={<CustomizedLabel />}
          />
          <Tooltip
            formatter={(value: number) =>
              value && value.toLocaleString() + " киши"
            }
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              borderColor: theme.palette.divider,
              fontSize: 12,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default HomePopulationCard;
