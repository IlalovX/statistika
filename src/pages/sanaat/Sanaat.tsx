import { Box, Typography, useTheme } from '@mui/material'
import { default as arrowUp } from '../../../public/Polygon 2 (1).svg'
import { default as arrowDown } from '../../../public/Polygon 2.svg'
import ChartCard from '../../components/chartCard/ChartCard'
import MapCard from '../../components/mapCard/MapCard'
import SanaatTable from '../../components/sanaatTable/SanaatTable'
import ThemeText from '../../components/themeText/ThemeText'

function Sanaat() {
	const theme = useTheme()
	return (
		<div>
			<ThemeText variant='h4' text='Сельское хозяйство' />
			<p className='text-gray-400'>
				Последний обновления{' '}
				<span
					className='font-bold '
					style={{
						color: theme.palette.mode === 'light' ? 'black' : 'white',
					}}
				>
					10.03.2025
				</span>
			</p>
			<ChartCard />
			<ThemeText variant='h4' text='Экспорт/Импорт' />
			<MapCard />
			<ThemeText variant='h4' text='Краткая информация' />
			<Typography variant='h6' color='gray'>
				сравнее прошлым годом
			</Typography>
			<div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 my-5'>
				<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[130px] rounded-2xl p-2.5'>
					<p>Средний чек</p>
					<div className='flex gap-2'>
						<p className='font-bold text-[20px]'>5000$</p>
						<img src={arrowUp} alt='' />
					</div>
				</Box>
				<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[130px] rounded-2xl p-2.5'>
					<p>Посители музея</p>
					<div className='flex gap-2'>
						<p className='font-bold text-[20px]'>2000</p>
						<img src={arrowUp} alt='' />
					</div>
				</Box>
				<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[130px] rounded-2xl p-2.5'>
					<p>Поездка Арал</p>
					<div className='flex gap-2'>
						<p className='font-bold text-[20px]'>500</p>
						<img src={arrowUp} alt='' />
					</div>
				</Box>
				<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[130px] rounded-2xl p-2.5'>
					<p>Туризм</p>
					<div className='flex gap-2'>
						<p className='font-bold text-[20px]'>500</p>
					</div>
				</Box>
			</div>
			<ThemeText variant='h4' text='Пахотные поля' />
			<Typography variant='h6' color='gray'>
				сравнее прошлым годом
			</Typography>
			<div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 my-5'>
				<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[130px] rounded-2xl p-2.5'>
					<p>Площадь посевных земель</p>
					<div className='flex gap-2'>
						<p className='font-bold text-[20px]'>5 000 га</p>
						<img src={arrowUp} alt='' />
					</div>
				</Box>
				<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[130px] rounded-2xl p-2.5'>
					<p>Посевная площадь</p>
					<div className='flex gap-2'>
						<p className='font-bold text-[20px]'>3 000 га</p>
						<img src={arrowDown} alt='' />
					</div>
				</Box>
				<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[130px] rounded-2xl p-2.5'>
					<p>Площадь свободных земель</p>
					<div className='flex gap-2'>
						<p className='font-bold text-[20px]'>2 000</p>
						<img src={arrowUp} alt='' />
					</div>
				</Box>
				<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[130px] rounded-2xl p-2.5'>
					<p>Другие</p>
					<div className='flex gap-2'>
						<p className='font-bold text-[20px]'>67</p>
					</div>
				</Box>
			</div>

			<ThemeText variant='h4' text='Информация о посеянном урожае' />
			<Typography variant='h6' color='gray'>
				сравнее прошлым годом
			</Typography>
			<SanaatTable />
		</div>
	)
}

export default Sanaat
