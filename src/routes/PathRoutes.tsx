import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { RoutesConsts } from '../const/routes'
import { RoutesEnums } from '../enums/routes'

const Layout = lazy(() => import('../layout/Layout'))
const Home = lazy(() => import('../pages/home/Home'))
const Tourism = lazy(() => import('../pages/tourism/Tourism'))
const Sanaat = lazy(() => import('../pages/sanaat/Sanaat'))
const Xojalik = lazy(() => import('../pages/xojalik/Xojalik'))
const Auth = lazy(() => import('../pages/auth/Auth'))
function PathRoutes() {
	return (
		<Routes>
			<Route
				element={
					<Suspense>
						<Layout />
					</Suspense>
				}
			>
				<Route
					path={RoutesConsts[RoutesEnums.HOME]}
					element={
						<Suspense>
							<Home />
						</Suspense>
					}
				/>
				<Route
					path={RoutesConsts[RoutesEnums.TOURISM]}
					element={
						<Suspense>
							<Tourism />
						</Suspense>
					}
				/>
				<Route
					path={RoutesConsts[RoutesEnums.SANAAT]}
					element={
						<Suspense>
							<Sanaat />
						</Suspense>
					}
				/>
				<Route
					path={RoutesConsts[RoutesEnums.XOJALIK]}
					element={
						<Suspense>
							<Xojalik />
						</Suspense>
					}
				/>
			</Route>
			<Route path={RoutesConsts[RoutesEnums.AUTH]} element={<Auth />} />
		</Routes>
	)
}
export default PathRoutes
