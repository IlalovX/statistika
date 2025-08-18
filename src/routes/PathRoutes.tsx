import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { ProtectedRoute } from "../components/common/ProtectRoute/ProtectRoute";
import { RoutesConsts } from "../const/routes";
import { RoutesEnums } from "../enums/routes";
import LoadingFallback from "../components/common/Loading/LoadingFallback";

const Layout = lazy(() => import("../layout/Layout"));
const Auth = lazy(() => import("../pages/auth/Auth"));
const Home = lazy(() => import("../pages/home/Home"));
const Tourism = lazy(() => import("../pages/tourism/Tourism"));
const Sanaat = lazy(() => import("../pages/sanaat/Sanaat"));
const Xojalik = lazy(() => import("../pages/xojalik/Xojalik"));
const Projects = lazy(() => import("../pages/projects/Projects"));
const NotFound = lazy(() => import("../pages/notFound/NotFound"));

function PathRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path={RoutesConsts[RoutesEnums.AUTH]} element={<Auth />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path={RoutesConsts[RoutesEnums.HOME]} element={<Home />} />
          <Route
            path={RoutesConsts[RoutesEnums.TOURISM]}
            element={<Tourism />}
          />
          <Route path={RoutesConsts[RoutesEnums.SANAAT]} element={<Sanaat />} />
          <Route
            path={RoutesConsts[RoutesEnums.XOJALIK]}
            element={<Xojalik />}
          />
          <Route
            path={RoutesConsts[RoutesEnums.PROJECTS]}
            element={<Projects />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
export default PathRoutes;
