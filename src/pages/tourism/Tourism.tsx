import { Box, Typography } from '@mui/material'
import { default as arrowUp } from '../../../public/Polygon 2 (1).svg'
import ChartCard from '../../components/chartCard/ChartCard'
import MapCard from '../../components/mapCard/MapCard'
import ThemeText from '../../components/themeText/ThemeText'

function Tourism() {
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
			<div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 mt-5'>
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
		</div>
	)
}

export default Tourism
