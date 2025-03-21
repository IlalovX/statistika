import { Box, Typography, useTheme } from '@mui/material'
import HomeAgesCard from '../../components/ui/homeAgesCard/HomeAgesCard'
import HomeCompaniesCard from '../../components/ui/homeCompaniesCard/HomeCompaniesCard'
import HomeExportImport from '../../components/ui/homeExportImport/HomeExportImport'
import HomeExportImportButton from '../../components/ui/homeExportImportButton/HomeExportImportButton'
import HomeMapCard from '../../components/ui/homeMapCard/HomeMapCard'
import HomePopulationCard from '../../components/ui/homePopulationCard/HomePopultaionCard'
import HomeProfit from '../../components/ui/homeProfit/HomeProfit'
import HomeSelfEmployedCard from '../../components/ui/homeSelfEmployedCard/HomeSelfEmployedCard'
import HomeUnemployersCard from '../../components/ui/homeUnemployersСard/HomeUnemployersСard'

function Home() {
	const theme = useTheme()

	return (
		<div>
			<div className='grid grid-cols-4 grid-rows-[400px] gap-3'>
				<HomeMapCard />
				<div className='grid grid-cols-1 grid-rows-[2fr_1fr] gap-2'>
					<HomePopulationCard />
					<HomeUnemployersCard />
				</div>
				<div className='grid grid-cols-1 grid-rows-2 gap-2'>
					<HomeAgesCard />
					<HomeSelfEmployedCard />
				</div>
				<HomeCompaniesCard />
			</div>
			<div className='grid grid-cols-4 gap-2 mt-3'>
				<div>
					<HomeProfit />
				</div>
				<Box
					className='shadow-xl rounded-2xl p-4 col-start-2 col-end-5 grid-cols-[70%_30%] grid'
					sx={{
						bgcolor: 'background.paper',
						border: `1px solid ${theme.palette.divider}`,
					}}
				>
					<HomeExportImport />
					<Box className='flex flex-col items-center justify-start gap-8'>
						<HomeExportImportButton />
						<div>
							<Typography
								variant='h5'
								sx={{ padding: 0, textAlign: 'center', letterSpacing: 3 }}
							>
								$25,825
							</Typography>
							<Typography variant='body2' sx={{ textAlign: 'center' }}>
								План: 56,800
							</Typography>
						</div>
					</Box>
				</Box>
			</div>
		</div>
	)
}

export default Home
