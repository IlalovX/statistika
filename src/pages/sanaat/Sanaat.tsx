import { Box, Typography, useTheme } from '@mui/material'
import ChartCard from '../../components/ui/chartCard/ChartCard'
import MapCard from '../../components/ui/mapCard/MapCard'
import SanaatTable from '../../components/ui/sanaatTable/SanaatTable'
import ThemeText from '../../components/ui/themeText/ThemeText'
import { default as arrowUp } from '/svg/Polygon 2 (1).svg'
import { default as arrowDown } from '/svg/Polygon 2.svg'

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
			<ChartCard
				start='Общее количество Продукция'
				end='Общее прибыль  продукции'
				data={{
					start: '2024',
					end: '2025',
					startValue: '0',
					endValue: '0',
				}}
			/>
			<ThemeText variant='h4' text='Инвесторы из зарубежа' />
			<Typography variant='h6' color='gray'>
				с начало года
			</Typography>
			<MapCard start='' end='' />
			<ThemeText variant='h4' text='Краткая информация' />
			<Typography variant='h6' color='gray'>
				сравнее прошлым годом
			</Typography>
			<div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 my-5'>
				<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[130px] rounded-2xl p-2.5'>
					<p>Средний чек</p>
					<div className='flex gap-2'>
						<p className='font-bold text-[20px]'>0</p>
						<img src={arrowUp} alt='' />
					</div>
				</Box>
				<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[130px] rounded-2xl p-2.5'>
					<p>Посители музея</p>
					<div className='flex gap-2'>
						<p className='font-bold text-[20px]'>0</p>
						<img src={arrowUp} alt='' />
					</div>
				</Box>
				<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[130px] rounded-2xl p-2.5'>
					<p>Поездка Арал</p>
					<div className='flex gap-2'>
						<p className='font-bold text-[20px]'>0</p>
						<img src={arrowUp} alt='' />
					</div>
				</Box>
				<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[130px] rounded-2xl p-2.5'>
					<p>Туризм</p>
					<div className='flex gap-2'>
						<p className='font-bold text-[20px]'>0</p>
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
						<p className='font-bold text-[20px]'>0</p>
						<img src={arrowUp} alt='' />
					</div>
				</Box>
				<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[130px] rounded-2xl p-2.5'>
					<p>Посевная площадь</p>
					<div className='flex gap-2'>
						<p className='font-bold text-[20px]'>0</p>
						<img src={arrowDown} alt='' />
					</div>
				</Box>
				<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[130px] rounded-2xl p-2.5'>
					<p>Площадь свободных земель</p>
					<div className='flex gap-2'>
						<p className='font-bold text-[20px]'>0</p>
						<img src={arrowUp} alt='' />
					</div>
				</Box>
				<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[130px] rounded-2xl p-2.5'>
					<p>Другие</p>
					<div className='flex gap-2'>
						<p className='font-bold text-[20px]'>0</p>
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
