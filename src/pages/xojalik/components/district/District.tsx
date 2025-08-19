import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { YearSelect } from "../../../../components/common/YearSelect/YearSelect";
import { currentYear } from "../../../../const/monthsOfYear";
import { useDistrictGeneral } from "../../../../hooks/useAgriculture";
import { AgricultureDistrictGeneral } from "../../../../types/agriculture.interface";
import DistrictModal from "./DistrictModal";
import { default as arrowUp } from "/svg/Polygon 2 (1).svg";
import { default as arrowDown } from "/svg/Polygon 2.svg";
// import QQ from "/svg/Слой 6.svg";
import KKMapSvg from "../../../../components/kk-map/KK-MapSvg";

interface Props {
  years: number[];
}

function District({ years }: Props) {
  const [year, setYear] = useState(currentYear);
  const { data: district = [] } = useDistrictGeneral(year);

  const theme = useTheme();

  return (
    <Box
      className="mt-5 shadow-2xl w-full rounded-2xl p-4"
      sx={{
        bgcolor: "background.paper",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <header className="flex justify-between items-center gap-5 mb-10">
        <Typography
          variant="h6"
          className="cursor-pointer"
          fontWeight="bold"
          color="blue"
        >
          Посажено всего
        </Typography>
        <YearSelect value={year} onChange={setYear} years={years} />
      </header>
      <Box className="grid grid-cols-2">
        <Box>
          {/* <img src={QQ} alt='' className='h-[300px] w-[300px] m-auto ' /> */}
          <KKMapSvg selectedYear={year} />
        </Box>

        <Box className="flex flex-col justify-between gap-2">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}
                >
                  <TableCell>Регион</TableCell>
                  <TableCell>Количество</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {district.map((row: AgricultureDistrictGeneral, index) => (
                  <TableRow
                    key={index}
                    sx={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}
                  >
                    <TableCell>{row.region_name}</TableCell>
                    <TableCell
                      sx={{
                        display: "grid",
                        gridGap: "5px",
                        gridTemplateColumns: "1fr 1fr 1fr",
                      }}
                    >
                      <span>{row.weight} т</span>
                      <img
                        src={row.percent.status === "up" ? arrowUp : arrowDown}
                        alt="trend"
                      />
                      <span>{row.percent.value}%</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <DistrictModal data={district} isLoading />
        </Box>
      </Box>
    </Box>
  );
}

export default District;
