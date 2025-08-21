import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Menu, MenuItem, useTheme } from "@mui/material";
import { useState } from "react";

interface YearMenuProps {
  selectedYear: number;
  onChange: (year: number) => void;
  years?: number[];
  className?: string;
  color?: string;
}

const mockYears = [
  2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
].reverse();

const YearMenu = ({
  selectedYear,
  onChange,
  years = mockYears,
  className,
  color,
}: YearMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  return (
    <>
      <Button
        className={className}
        variant="outlined"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        disableFocusRipple
        disableRipple
        sx={{
          border: "none",
          padding: 0,
          textTransform: "none",
          gap: 0,
          color,
        }}
      >
        <Box display="flex" alignItems="center" gap={0}>
          {selectedYear}
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
            maxHeight: 160,
            overflow: "auto",
          },
        }}
      >
        {years.map((year) => (
          <MenuItem
            key={year}
            selected={selectedYear === year}
            onClick={() => {
              onChange(year);
              setAnchorEl(null);
            }}
          >
            {year}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default YearMenu;
