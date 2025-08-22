import { Agriculture } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
// import YearMenu from "../../../../components/common/YearMenu/YearMenu";
import { useGetStatProduct } from "../../../../hooks/useAgriculture";
import PlantedAreaModal from "./PlantedAreaModal";

export default function PlantedArea() {
  const theme = useTheme();
  const [year, setYear] = useState<number | null>(null);
  // const { data: placement = [] } = useClientPlacement(year)
  const { data: harvested = [] } = useGetStatProduct();

  useEffect(() => {
    if (harvested.length > 0) {
      const years = Object.keys(harvested[0].values || {}).map(Number);
      setYear(Math.max(...years));
    }
  }, [harvested]);

  return (
    <Box
      className="p-5 rounded-xl shadow-md relative flex flex-col "
      sx={{
        bgcolor: "background.paper",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <div className="flex justify-between items-center">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color:
              theme.palette.mode === "light"
                ? "rgb(104, 104, 133)"
                : "rgb(169, 169, 160)",
          }}
        >
          Кўрсаткичлар
        </Typography>
        {/* <div>
          <YearMenu
            selectedYear={year}
            onChange={setYear}
            className="!text-xl"
            color={theme.palette.primary.main}
          />
        </div> */}
      </div>
      <div className="flex flex-col justify-between h-full">
        <TableContainer className="h-fit">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                ></TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Майдон
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Экилди
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Ҳосил <br />
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontStyle: "italic",
                      fontWeight: 100,
                      color:
                        theme.palette.mode === "light"
                          ? "rgb(104, 104, 133)"
                          : "rgb(169, 169, 160)",
                    }}
                  >
                    "Минг тонна"
                  </Typography>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Фоизда</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {harvested?.slice(0, 6).map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography
                      className="flex items-center gap-2"
                      fontSize={14}
                    >
                      <Avatar sx={{ width: 24, height: 24 }}>
                        <Agriculture fontSize="small" />
                      </Avatar>
                      {item.metadata}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: 16, textAlign: "center" }}>
                    {0}
                  </TableCell>
                  <TableCell sx={{ fontSize: 16, textAlign: "center" }}>
                    {0}
                  </TableCell>
                  <TableCell sx={{ fontSize: 16, textAlign: "center" }}>
                    {year && item.values[year] ? `${item.values[year]} т` : "-"}
                  </TableCell>
                  <TableCell sx={{ fontSize: 16, textAlign: "center" }}>
                    {0}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <PlantedAreaModal placement={harvested} />
      </div>
    </Box>
  );
}
