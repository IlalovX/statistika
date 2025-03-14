import { Box, Typography, useTheme } from '@mui/material'
import { default as arrowup } from '../../../public/Polygon 2 (1).svg'
import HomeDoughnut from '../ui/homeDoughnut/HomeDoughnut'
import HomeExportImport from '../ui/homeExportImport/HomeExportImport'
import HomeExportImportButton from '../ui/homeExportImportButton/HomeExportImportButton'
import HomeLineOfChart from '../ui/homeLineOfChart/HomeLineOfChart'
import HomeList from '../ui/homeList/HomeList'
import HomeMapCard from '../ui/homeMapCard/HomeMapCard'
import HomeProfit from '../ui/homeProfit/HomeProfit'
import ThemeText from '../ui/themeText/ThemeText'
function HomeBody() {
	const theme = useTheme()
	return (
		<div>
			<div className='grid grid-cols-4 grid-rows-[380px] gap-3'>
				<HomeMapCard />
				<div className='grid grid-cols-1 grid-rows-[70%,30%] gap-5'>
					<Box
						className='shadow-xl rounded-2xl p-1.5'
						sx={{
							bgcolor: 'background.paper',
							border: `1px solid ${theme.palette.divider}`,
						}}
					>
						<ThemeText text='Население' variant='h6' />
						<p className='text-gray-400'>за 2025г</p>
						<HomeLineOfChart />
						<div className='flex items-center justify-between'>
							<Typography variant='body1'>
								2 064 000 <br /> человек
							</Typography>
							<span className='text-green-500'>+10,5%</span>
						</div>
					</Box>
					<Box
						className='shadow-xl rounded-2xl p-1.5'
						sx={{
							bgcolor: 'background.paper',
							border: `1px solid ${theme.palette.divider}`,
						}}
					>
						<ThemeText text='Безработные' variant='h6' />
						<p className='text-gray-400'>250 человек</p>
						<HomeLineOfChart />
						<div className='flex items-center justify-between text-gray-400 gap-1 text-sm'>
							<span>2020</span>
							<span>2021</span>
							<span>2022</span>
							<span>2023</span>
							<span>2024</span>
						</div>
					</Box>
				</div>
				<div className='grid grid-cols-1 grid-rows-2 gap-2'>
					<Box
						className='shadow-xl rounded-2xl p-1.5'
						sx={{
							bgcolor: 'background.paper',
							border: `1px solid ${theme.palette.divider}`,
						}}
					>
						<ThemeText text='Население' variant='h6' />
						<p className='text-gray-400'>за 2025г</p>
						<ul className='mt-1 flex flex-col gap-2'>
							<li className='flex justify-between items-center'>
								<div className='w-[50%] bg-[#7367F0] h-2 rounded-xl ' />
								<span className='text-xs'>до 18 лет</span>
							</li>
							<li className='flex justify-between items-center'>
								<div className='w-[60%] bg-[#7367F0] h-2 rounded-xl' />
								<span className='text-xs'>до 30 лет</span>
							</li>
							<li className='flex justify-between items-center'>
								<div className='w-[60%] bg-[#7367F0] h-2 rounded-xl' />
								<span className='text-xs'>до 55 лет</span>
							</li>
							<li className='flex justify-between items-center'>
								<div className='w-[30%] bg-[#7367F0] h-2 rounded-xl' />
								<span className='text-xs'>до 60 лет</span>
							</li>
						</ul>
					</Box>
					<Box
						className='shadow-xl rounded-2xl p-1.5'
						sx={{
							bgcolor: 'background.paper',
							border: `1px solid ${theme.palette.divider}`,
						}}
					>
						<ThemeText text='Самозанятый' variant='h6' />
						<p className='text-gray-400'>за 2025г</p>
						<HomeDoughnut />
					</Box>
				</div>
				<Box
					className='shadow-xl rounded-2xl p-1.5'
					sx={{
						bgcolor: 'background.paper',
						border: `1px solid ${theme.palette.divider}`,
					}}
				>
					<div className='flex justify-between items-center'>
						<div className='flex flex-col gap-5'>
							<div>
								<ThemeText text='Самозанятый' variant='h6' />
								<p className='text-gray-400'>за 2025г</p>
							</div>
							<div>
								<Typography variant='h6'>100</Typography>
								<p className='flex gap-1 items-center'>
									<img src={arrowup} alt='' />
									15.8%
								</p>
							</div>
						</div>
						<div className='mt-5'>
							<HomeDoughnut />
						</div>
					</div>
					<HomeList />
				</Box>
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
					<Box className='flex flex-col justify-between h-full border-r-2 border-gray-200'>
						<div className='font-bold flex gap-2'>
							<Typography className='text-[#7367F0]'>Экспорт</Typography>
							<Typography className='text-[#FF9F43]'>Импорт</Typography>
						</div>
						<HomeExportImport />
					</Box>
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
