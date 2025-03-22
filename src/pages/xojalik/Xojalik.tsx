import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import AgricultureBarChart from '../../components/ui/agricultureBarChart/AgricultureBarChart'
import AgricultureTable from '../../components/ui/agricultureTable/AgricultureTable'
import ChartCard from '../../components/ui/chartCard/ChartCard'
import MapCard from '../../components/ui/mapCard/MapCard'
import ThemeText from '../../components/ui/themeText/ThemeText'
import XojalikCompaniesCard from '../../components/ui/xojalikCompaniesCard/XojalikCompaniesCard'
import XojalikHarvestTable from '../../components/ui/xojalikHarvestTable/XojalikHarvestTable'
import XojalikPlantedCard from '../../components/ui/xojalikPlantedCard/XojalikPlantedCard'
import { default as arrowUp } from '/svg/Polygon 2 (1).svg'

function Xojalik() {
	const { data: xojalik } = useQuery({
		queryKey: ['xojalik'],
		queryFn: async () => {
			const res = await fetch(
				'/db/others/bárshe_turlerinde_islep_shıģılģan_dıyqanshılıq_ònimleri_haqqında.json'
			)
			if (!res.ok) {
				throw new Error('Ошибка загрузки данных')
			}
			return res.json()
		},
	})

	return (
		<div>
			<ThemeText variant='h4' text='Сельское хозяйство' />
			<Typography variant='body2' color='grey'>
				Последний обновления 10.03.2025
			</Typography>
			<ChartCard
				start='Общее количество собранных урожаев'
				end='Общий прибыль от собранных урожаев'
			/>
			<ThemeText variant='h4' text='Экспорт Импорт' />
			<MapCard start='Экспорт' end='Импорт' />
			<div className='grid grid-cols-2 grid-rows-1'>
				<div>
					<ThemeText variant='h4' text='Краткая информация' />
					<Typography variant='h6' color='gray'>
						Краткая информация
					</Typography>
					<div className='grid grid-cols-[repeat(2,minmax(250px,1fr))] grid-rows-2 gap-4 my-5'>
						<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
							<p>Урожай</p>
							<div className='flex gap-2'>
								<p className='font-bold text-[20px]'>
									{xojalik
										? xojalik['Dán hám dukkakli dán eginleri jámi']['2024']
										: 0}
								</p>
								<img src={arrowUp} alt='' />
							</div>
						</Box>
						<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
							<p>Прибыль</p>
							<div className='flex gap-2'>
								<p className='font-bold text-[20px]'>0</p>
								<img src={arrowUp} alt='' />
							</div>
						</Box>
						<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
							<p>Экспорт</p>
							<div className='flex gap-2'>
								<p className='font-bold text-[20px]'>0</p>
								<img src={arrowUp} alt='' />
							</div>
						</Box>
						<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
							<p>Импорт</p>
							<div className='flex gap-2'>
								<p className='font-bold text-[20px]'>0</p>
							</div>
						</Box>
					</div>
				</div>
				<div>
					<ThemeText variant='h4' text='Пахотные поля' />
					<Typography variant='h6' color='gray'>
						сравнее прошлым годом
					</Typography>
					<div className='grid grid-cols-[repeat(2,minmax(250px,1fr))] grid-rows-2 gap-4 my-5'>
						<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
							<p>Площадь посевных земель</p>
							<div className='flex gap-2'>
								<p className='font-bold text-[20px]'>0</p>
								<img src={arrowUp} alt='' />
							</div>
						</Box>
						<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
							<p>Посевная площадь</p>
							<div className='flex gap-2'>
								<p className='font-bold text-[20px]'>0</p>
								<img src={arrowUp} alt='' />
							</div>
						</Box>
						<Box className='flex flex-col justify-center items-center shadow-2xl min-w-[250px] min-h-[100px] rounded-2xl p-2.5'>
							<p>Площадь свободных земель</p>
							<div className='flex gap-2'>
								<p className='font-bold text-[20px]'>0</p>
								<img src={arrowUp} alt='' />
							</div>
						</Box>
					</div>
				</div>
			</div>

			<ThemeText variant='h4' text='Размещение' />
			<Typography variant='h6' color='gray'>
				за 2025 год
			</Typography>
			<Box className='grid grid-cols-2 grid-rows-[350px] gap-5 mt-5'>
				<AgricultureTable />
				<XojalikHarvestTable />
			</Box>
			<Box className='grid grid-cols-[3fr_1fr] grid-rows-[350px] gap-5 mt-5'>
				<AgricultureBarChart />
				<XojalikCompaniesCard />
			</Box>
			<XojalikPlantedCard />
		</div>
	)
}

export default Xojalik
