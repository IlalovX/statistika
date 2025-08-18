import { lazy, Suspense } from "react";
import { useTheme } from "@mui/material";
import LoadingFallback from "../../components/common/Loading/LoadingFallback";

const CompaniesCard = lazy(
  () => import("./components/companiesCard/CompaniesCard")
);
const GenderAgeCard = lazy(
  () => import("./components/genderAgeCard/GenderAgeCard")
);
const HomeExportImport = lazy(
  () => import("./components/homeExportImport/HomeExportImport")
);
const HomeMapCard = lazy(() => import("./components/homeMapCard/HomeMapCard"));
const HomePopulationCard = lazy(
  () => import("./components/homePopulationCard/HomePopultaionCard")
);
const EmploymentCard = lazy(
  () => import("./components/jobsCard/EmploymentCard")
);
const PovertyCard = lazy(() => import("./components/povertyCard/PovertyCard"));
const ProfitCard = lazy(() => import("./components/profitCard/ProfitCard"));
const SalaryCard = lazy(() => import("./components/salaryCard/SalaryCard"));
const SmallBusinessCard = lazy(
  () => import("./components/smallBusinessCard/SmallBusinessCard")
);
const HomeUnemployersСard = lazy(
  () => import("./components/unemployedCard/UnemployedCard")
);

function Home() {
  const theme = useTheme();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_0.8fr_1.2fr_1fr] grid-rows-[450px] gap-3">
        <HomeMapCard />
        <div className="grid grid-cols-1 grid-rows-2 gap-2">
          <HomePopulationCard />
          <HomeUnemployersСard />
        </div>
        <div className="col-span-2 flex flex-col  box-border gap-3 justify-between">
          <div className="grid grid-cols-[1fr_0.8fr_1.2fr] gap-3 grid-rows-1">
            <GenderAgeCard />
            <PovertyCard />
            <SalaryCard />
          </div>
          <div className="grid grid-cols-[1.6fr_1.4fr] grid-rows-1 gap-3 h-full">
            <EmploymentCard />
            <ProfitCard />
          </div>
        </div>
      </section>
      <section className="grid grid-cols-4 gap-2 mt-3">
        <CompaniesCard />
        <SmallBusinessCard />
        <div
          className="shadow-xl rounded-2xl p-4 col-span-2 grid-cols-1 grid"
          style={{
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <HomeExportImport />
        </div>
      </section>
    </Suspense>
  );
}

export default Home;
