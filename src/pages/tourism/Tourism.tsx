import { Box, Typography } from '@mui/material'
import ChartCard from '../../components/ui/chartCard/ChartCard'
import MapCard from '../../components/ui/mapCard/MapCard'
import ThemeText from '../../components/ui/themeText/ThemeText'
import { default as arrowUp } from '/svg/Polygon 2 (1).svg'

function Tourism() {
	return (
		<div>
			<ThemeText variant='h4' text='Туризм' />
			<ChartCard
				start='Общее количество Туристов'
				end='Общее прибыль от Туристов'
			/>
			<ThemeText variant='h4' text='Источники/страны' />

			<MapCard start='Прибывшие туристы' end='Уехавшие туристы' />
			<div className='my-5'>
				<ThemeText variant='h4' text='Краткая информация' />
				<Typography variant='h6' color='gray'>
					Краткая информация
				</Typography>
				<div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 my-5'>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Средний чек</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0$</p>
							<img src={arrowUp} alt='' />
						</div>
					</Box>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Посители музея</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0</p>
							<img src={arrowUp} alt='' />
						</div>
					</Box>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Поездка Арал</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0</p>
							<img src={arrowUp} alt='' />
						</div>
					</Box>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Туризм</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0</p>
						</div>
					</Box>
				</div>
			</div>
			<div className='my-5'>
				<ThemeText variant='h4' text='Цели туризма' />
				<Typography variant='h6' color='gray'>
					с начало месяца
				</Typography>
				<div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 my-5'>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Бизнес</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0$</p>
							<img src={arrowUp} alt='' />
						</div>
					</Box>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Лечение</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0</p>
							<img src={arrowUp} alt='' />
						</div>
					</Box>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Отдых</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0</p>
							<img src={arrowUp} alt='' />
						</div>
					</Box>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Спорт</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0</p>
						</div>
					</Box>
				</div>
			</div>
			<div className='my-5'>
				<ThemeText variant='h4' text='Маршрут и направления' />
				<Typography variant='h6' color='gray'>
					с начало месяца
				</Typography>
				<div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 my-5'>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Музей</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0</p>
							<img src={arrowUp} alt='' />
						</div>
					</Box>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Арал</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0</p>
							<img src={arrowUp} alt='' />
						</div>
					</Box>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Исторические места</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0</p>
							<img src={arrowUp} alt='' />
						</div>
					</Box>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Другие</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0</p>
						</div>
					</Box>
				</div>
			</div>
			<div className='my-5'>
				<ThemeText variant='h4' text='Инфраструктура' />
				<Typography variant='h6' color='gray'>
					с начало месяца
				</Typography>
				<div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-rows-2 gap-4 my-5'>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Гостиницы</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0</p>
							<img src={arrowUp} alt='' />
						</div>
					</Box>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Отели</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0</p>
							<img src={arrowUp} alt='' />
						</div>
					</Box>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Хостелы</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0</p>
							<img src={arrowUp} alt='' />
						</div>
					</Box>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Рестораны</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0</p>
						</div>
					</Box>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Кафе</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0</p>
							<img src={arrowUp} alt='' />
						</div>
					</Box>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Столовая</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0</p>
							<img src={arrowUp} alt='' />
						</div>
					</Box>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Парк</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0</p>
							<img src={arrowUp} alt='' />
						</div>
					</Box>
					<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
						<p>Другие</p>
						<div className='flex gap-2'>
							<p className='font-bold text-[20px]'>0</p>
						</div>
					</Box>
				</div>
			</div>
		</div>
	)
}

export default Tourism
