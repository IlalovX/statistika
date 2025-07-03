import { Box, useTheme } from '@mui/material'
import HomeAgesCard from './components/homeAgesCard/HomeAgesCard'
import HomeCompaniesCard from './components/homeCompaniesCard/HomeCompaniesCard'
import HomeExportImport from './components/homeExportImport/HomeExportImport'
import HomeMapCard from './components/homeMapCard/HomeMapCard'
import HomePopulationCard from './components/homePopulationCard/HomePopultaionCard'
import HomeProfit from './components/homeProfit/HomeProfit'
import HomeSelfEmployedCard from './components/homeSelfEmployedCard/HomeSelfEmployedCard'
import HomeUnemployersСard from './components/homeUnemployersCard/HomeUnemployersCard'

function Home() {
	const theme = useTheme()

	return (
		<div>
			<section className='grid grid-cols-4 grid-rows-[400px] gap-3'>
				<HomeMapCard />
				<div className='grid grid-cols-1 grid-rows-[2fr_1fr] gap-2'>
					<HomePopulationCard />
					<HomeUnemployersСard />
				</div>
				<div className='grid grid-cols-1 grid-rows-2 gap-2'>
					<HomeAgesCard />
					<HomeSelfEmployedCard />
				</div>
				<HomeCompaniesCard />
			</section>
			<section className='grid grid-cols-4 gap-2 mt-3'>
				<div>
					<HomeProfit />
				</div>
				<Box
					className='shadow-xl rounded-2xl p-4 col-start-2 col-end-5 grid-cols-1 grid'
					sx={{
						bgcolor: 'background.paper',
						border: `1px solid ${theme.palette.divider}`,
					}}
				>
					<HomeExportImport />
				</Box>
			</section>
		</div>
	)
}

export default Home
