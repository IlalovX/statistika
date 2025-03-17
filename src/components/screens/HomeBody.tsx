import { Box, Typography, useTheme } from '@mui/material'
import HomeAgesCard from '../ui/homeAgesCard/HomeAgesCard'
import HomeCompaniesCard from '../ui/homeCompaniesCard/HomeCompaniesCard'
import HomeExportImport from '../ui/homeExportImport/HomeExportImport'
import HomeExportImportButton from '../ui/homeExportImportButton/HomeExportImportButton'
import HomeMapCard from '../ui/homeMapCard/HomeMapCard'
import HomePopultaionCard from '../ui/homePopulationCard/HomePopultaionCard'
import HomeProfit from '../ui/homeProfit/HomeProfit'
import HomeSelfEmployedCard from '../ui/homeSelfEmployedCard/HomeSelfEmployedCard'
import HomeUnemployersСard from '../ui/homeUnemployersСard/HomeUnemployersСard'
function HomeBody() {
	const theme = useTheme()

	return (
		<div>
			<div className='grid grid-cols-4 grid-rows-[380px] gap-3'>
				<HomeMapCard />
				<div className='grid grid-cols-1 grid-rows-[70%,30%] gap-2'>
					<HomePopultaionCard />
					<HomeUnemployersСard />
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

export default HomeBody
