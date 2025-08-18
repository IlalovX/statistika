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
import { CustomizedAxisTick } from "../../../../components/ui/ChartComponents";
import { useGetPoverty } from "../../../../hooks/useHome";

function getYearRangesFromEnd(years: string[], chunkSize = 4): string[][] {
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

function PovertyCard() {
  const theme = useTheme();

  const [selectedRange, setSelectedRange] = useState<string>("");
  const { data } = useGetPoverty();

  const years = useMemo(() => {
    if (!data) return [];
    return Object.keys(data)
      .filter((key) => /^\d{4}$/.test(key))
      .sort();
  }, [data]);

  const ranges = useMemo(() => {
    const chunks = getYearRangesFromEnd(years, 4);
    return chunks.map((chunk) => `${chunk[0]}–${chunk[chunk.length - 1]}`);
  }, [years]);

  useEffect(() => {
    if (ranges.length > 0 && !selectedRange) {
      setSelectedRange(ranges[ranges.length - 1]);
    }
  }, [ranges, selectedRange]);

  const chartData = useMemo(() => {
    if (!selectedRange || !data) return [];
    const [start, end] = selectedRange.split("–");
    const selectedYears = years.filter((y) => y >= start && y <= end);
    return selectedYears.map((year) => ({
      name: year,
      бедность: Number(data[year]) || 0,
    }));
  }, [selectedRange, data, years]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <Box
      className="shadow-xl rounded-2xl p-1.5 flex flex-col justify-between"
      sx={{
        bgcolor: "background.paper",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <Typography variant="body2" fontWeight="bold">
          Камбағаллик
          <br />
          даражаси
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
            whiteSpace: "nowrap",
            gap: 0,
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
            dataKey="бедность"
            stroke="#00BAD1"
            dot={{ r: 5 }}
            label={({ x, y, value }) => (
              <text
                x={x}
                y={y}
                dy={-14}
                fill={theme.palette.primary.main}
                fontSize={14}
                textAnchor="middle"
              >
                {value}%
              </text>
            )}
          />
          <Tooltip
            formatter={(value: number) =>
              value && value.toLocaleString() + " %"
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

export default PovertyCard;
