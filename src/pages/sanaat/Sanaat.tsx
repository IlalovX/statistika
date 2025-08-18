import { Typography, useTheme } from "@mui/material";
import ThemeText from "../../components/ui/ThemeText";
import {
  useGetInvestmentLastUpdate,
  useGetInvestmentYears,
} from "../../hooks/useInvestment";
import Amount from "./components/amount/Amount";
import ChartCard from "./components/ChartCard";
import CreatedJobs from "./components/created-jobs/CreatedJobs";
import Indicators from "./components/indicators/Indicators";
import InvestmentProjectsRegion from "./components/investmentProjectsRegion/InvestmentProjectsRegion";
import InvestorsMap from "./components/investorsMap/InvestorsMap";
import OutputPieChart from "./components/output/OutputPieChart";
import Projects from "./components/projects/Projects";

function Sanaat() {
  const theme = useTheme();
  const { data: last_update } = useGetInvestmentLastUpdate();
  const { data: years } = useGetInvestmentYears();

  return (
    <div className="space-y-10">
      <section>
        <ThemeText variant="h4" text="Промышленность" />
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
        <Indicators years={years} />
      </section>
      <br />
      <br />
      <section>
        <OutputPieChart />
      </section>
      <section>
        <ThemeText variant="h4" text="Инвестиция" />
        <Typography variant="h6" color="gray">
          с начало года
        </Typography>
        <div className=" grid grid-cols-[35%_65%] gap-2 my-6 ">
          <Projects years={years} />
          <Amount years={years} />
        </div>
        <CreatedJobs years={years} />
      </section>

      <section>
        <InvestmentProjectsRegion years={years} />
      </section>
      <section>
        <InvestorsMap years={years} />
      </section>
    </div>
  );
}

export default Sanaat;
