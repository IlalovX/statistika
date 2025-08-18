import { Box, useTheme } from "@mui/material";
import ThemeText from "../../components/ui/ThemeText";
import {
  useAgricultureLastUpdate,
  useGetAgricultureYears,
} from "../../hooks/useAgriculture";
import ChartCard from "./components/ChartCard";
import Companies from "./components/companies/Companies";
import District from "./components/district/District";
import ExportImport from "./components/exportImport/ExportImport";
import Fields from "./components/fields/Fields";
import MarketBarChart from "./components/MarketBarChart";
import PlantedArea from "./components/plantedArea/PlantedArea";
import Summary from "./components/summary/Summary";
import Water from "./components/water/Water";

function Xojalik() {
  const theme = useTheme();
  const { data: last_update } = useAgricultureLastUpdate();
  const { data: years } = useGetAgricultureYears();
  return (
    <div className="space-y-10">
      <section>
        <ThemeText variant="h4" text="Сельское хозяйство" />
        <p className="text-gray-400">
          Последний обновления
          <span
            className="font-bold ml-2"
            style={{
              color: theme.palette.mode === "light" ? "black" : "white",
            }}
          >
            {last_update}
          </span>
        </p>

        <ChartCard years={years} />
      </section>
      <section>
        <ExportImport years={years} />
      </section>
      <section className="grid grid-cols-2 grid-rows-1 gap-10 mb-5">
        <Summary years={years} />
        <Fields years={years} />
      </section>
      <section>
        <ThemeText variant="h4" text="Размещение" />
        <Box className="grid grid-cols-2 grid-rows-1 gap-5 mt-5">
          <PlantedArea />
          <div className="flex flex-col justify-between gap-5">
            <Companies />
            <Water years={years} />
          </div>
        </Box>
      </section>
      <section>
        <MarketBarChart years={years} />
      </section>
      <section>
        <District years={years} />
      </section>
    </div>
  );
}

export default Xojalik;
