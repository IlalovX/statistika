import { Box, Typography } from '@mui/material'
import AgricultureBarChart from '../../components/ui/agricultureBarChart/AgricultureBarChart'
import AgricultureTable from '../../components/ui/agricultureTable/AgricultureTable'
import ChartCard from '../../components/ui/chartCard/ChartCard'
import HomeCompaniesCard from '../../components/ui/homeCompaniesCard/HomeCompaniesCard'
import MapCard from '../../components/ui/mapCard/MapCard'
import ThemeText from '../../components/ui/themeText/ThemeText'
import XojalikPlantedCard from '../../components/xojalikPlantedCard/XojalikPlantedCard'
import { default as arrowUp } from '/svg/Polygon 2 (1).svg'

function Xojalik() {
	return (
		<div>
			<ThemeText variant='h4' text='Туризм' />
			<ChartCard />
			<ThemeText variant='h4' text='Источники/страны' />
			<MapCard />
			<ThemeText variant='h4' text='Краткая информация' />
			<Typography variant='h6' color='gray'>
				Краткая информация
			</Typography>
			<div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 my-5'>
				<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
					<p>Средний чек</p>
					<div className='flex gap-2'>
						<p className='font-bold text-[20px]'>5000$</p>
						<img src={arrowUp} alt='' />
					</div>
				</Box>
				<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
					<p>Посители музея</p>
					<div className='flex gap-2'>
						<p className='font-bold text-[20px]'>2000</p>
						<img src={arrowUp} alt='' />
					</div>
				</Box>
				<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
					<p>Поездка Арал</p>
					<div className='flex gap-2'>
						<p className='font-bold text-[20px]'>500</p>
						<img src={arrowUp} alt='' />
					</div>
				</Box>
				<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
					<p>Туризм</p>
					<div className='flex gap-2'>
						<p className='font-bold text-[20px]'>500</p>
					</div>
				</Box>
			</div>
			<ThemeText variant='h4' text='Размещение' />
			<Typography variant='h6' color='gray'>
				за 2025 год
			</Typography>
			<Box className='grid grid-cols-2 grid-rows-[350px] gap-5 mt-5'>
				<AgricultureTable />
				<AgricultureTable />
			</Box>
			<Box className='grid grid-cols-[3fr_1fr] grid-rows-[350px] gap-5 mt-5'>
				<AgricultureBarChart />
				<HomeCompaniesCard />
			</Box>
			<XojalikPlantedCard />
		</div>
	)
}

export default Xojalik
