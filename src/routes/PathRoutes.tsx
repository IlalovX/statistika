import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { ProtectedRoute } from '../components/common/ProtectRoute/ProtectRoute'
import { RoutesConsts } from '../const/routes'
import { RoutesEnums } from '../enums/routes'

const Layout = lazy(() => import('../layout/Layout'))
const Auth = lazy(() => import('../pages/auth/Auth'))
const Home = lazy(() => import('../pages/home/Home'))
const Tourism = lazy(() => import('../pages/tourism/Tourism'))
const Sanaat = lazy(() => import('../pages/sanaat/Sanaat'))
const Xojalik = lazy(() => import('../pages/xojalik/Xojalik'))
const Projects = lazy(() => import('../pages/projects/Projects'))

function PathRoutes() {
	return (
		<Routes>
			<Route
				path={RoutesConsts[RoutesEnums.AUTH]}
				element={
					<Suspense>
						<Auth />
					</Suspense>
				}
			/>
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
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						</Suspense>
					}
				/>
				<Route
					path={RoutesConsts[RoutesEnums.TOURISM]}
					element={
						<Suspense>
							<ProtectedRoute>
								<Tourism />
							</ProtectedRoute>
						</Suspense>
					}
				/>
				<Route
					path={RoutesConsts[RoutesEnums.SANAAT]}
					element={
						<Suspense>
							<ProtectedRoute>
								<Sanaat />
							</ProtectedRoute>
						</Suspense>
					}
				/>
				<Route
					path={RoutesConsts[RoutesEnums.XOJALIK]}
					element={
						<Suspense>
							<ProtectedRoute>
								<Xojalik />
							</ProtectedRoute>
						</Suspense>
					}
				/>
				<Route
					path={RoutesConsts[RoutesEnums.PROJECTS]}
					element={
						<Suspense>
							<ProtectedRoute>
								<Projects />
							</ProtectedRoute>
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	)
}
export default PathRoutes
