import { MenuItem, TextField } from "@mui/material";

interface YearSelectProps {
  value: number;
  onChange: (value: number) => void;
  years?: number[];
}

const currentYear = new Date().getFullYear();
const defaultYears = Array.from({ length: 10 }, (_, i) => currentYear - i);

export const YearSelect = ({
  value,
  onChange,
  years = defaultYears,
}: YearSelectProps) => {
  return (
    <TextField
      select
      label="Год"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      sx={{ width: 120 }}
      SelectProps={{
        MenuProps: {
          PaperProps: {
            style: {
              maxHeight: 4 * 40,
            },
          },
        },
      }}
    >
      {years.map((year) => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </TextField>
  );
};
