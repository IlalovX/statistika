import {
  // Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
// import { TooltipProps } from "@mui/material/Tooltip";
import { useMemo, useState } from "react";
import YearMenu from "../../../../components/common/YearMenu/YearMenu";
import { useGetPopulationOfDistricts } from "../../../../hooks/useHome";
// import CustomTooltipContent from "../homeMapTooltip/HomeMapTooltip";
import styles from "./HomeMap.module.scss";
import KKMapSvg from "../../../../components/kk-map/KK-MapSvg";

// const HtmlTooltip = (props: TooltipProps) => {
//   const theme = useTheme();
//   const [open, setOpen] = useState(false);

//   const handleTooltipOpen = () => {
//     setOpen(true);
//   };

//   const handleTooltipClose = () => {
//     setOpen(false);
//   };

//   return (
//     <ClickAwayListener onClickAway={handleTooltipClose}>
//       <Tooltip
//         {...props}
//         open={open}
//         followCursor
//         onClose={handleTooltipClose}
//         slotProps={{
//           tooltip: {
//             sx: {
//               backgroundColor:
//                 theme.palette.mode === "dark"
//                   ? theme.palette.background.paper
//                   : "white",
//               color: theme.palette.mode === "dark" ? "white" : "#2E2E2E",
//               maxWidth: 220,
//               fontSize: "12px",
//               border: `1px solid ${theme.palette.divider}`,
//               boxShadow: theme.shadows[3],
//             },
//           },
//         }}
//       >
//         <g
//           onClick={handleTooltipOpen}
//           onMouseEnter={handleTooltipOpen}
//           onMouseLeave={handleTooltipClose}
//           style={{ cursor: "pointer" }}
//         >
//           {props.children}
//         </g>
//       </Tooltip>
//     </ClickAwayListener>
//   );
// };

function HomeMapCard() {
  const { data: map = [] } = useGetPopulationOfDistricts();
  const theme = useTheme();

  const [selectedYear, setSelectedYear] = useState<number>(2025);

  const years = useMemo(() => {
    if (!map.length) return [];

    return Object.keys(map[0])
      .filter((key) => /^\d{4}$/.test(key)) // оставить только года
      .map(Number)
      .sort((a, b) => b - a); // сортировка по убыванию
  }, [map]);

  return (
    <Box
      className={`shadow-xl rounded-xl p-2 flex items-center justify-center flex-col ${styles.map}`}
      sx={{
        bgcolor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <div className="flex flex-col items-center gap-2 !mb-5">
        <Typography
          variant="h6"
          className="self-center !p-0  whitespace-nowrap !font-bold  text-center"
        >
          Қорақалпоғистон аҳолиси
          <br />
          туманлар кесимида
        </Typography>
        <YearMenu
          years={years}
          onChange={setSelectedYear}
          selectedYear={selectedYear}
          className="self-end"
        />
      </div>

      <KKMapSvg selectedYear={selectedYear} />
    </Box>
  );
}

export default HomeMapCard;
