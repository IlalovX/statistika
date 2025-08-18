import { Autocomplete, TextField } from "@mui/material";
import { MONTHS } from "../../../const/monthsOfYear";

interface MonthSelectProps {
  value: { value: number; label: string };
  onChange: (value: { value: number; label: string }) => void;
}

export const MonthSelect = ({ value, onChange }: MonthSelectProps) => {
  const selectedOption = MONTHS.find((month) => month.value === value.value);

  return (
    <Autocomplete
      options={MONTHS}
      getOptionLabel={(option) => option.label}
      value={selectedOption}
      onChange={(_, newValue) => {
        if (newValue) onChange(newValue);
      }}
      renderInput={(params) => <TextField {...params} label="Месяц" />}
      sx={{ width: 150 }}
      disableClearable
      ListboxProps={{
        style: {
          maxHeight: 200, // например, 200px
          overflow: "auto",
        },
      }}
    />
  );
};
