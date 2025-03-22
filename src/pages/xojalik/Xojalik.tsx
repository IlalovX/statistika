import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import ChartCard from '../../components/ui/chartCard/ChartCard'
import MapCard from '../../components/ui/mapCard/MapCard'
import ThemeText from '../../components/ui/themeText/ThemeText'
import AgricultureBarChart from '../../components/ui/xojalik/xojalikBarChart/AgricultureBarChart'
import XojalikCompaniesCard from '../../components/ui/xojalik/xojalikCompaniesCard/XojalikCompaniesCard'
import XojalikFieldCard from '../../components/ui/xojalik/xojalikFieldCard/XojalikFieldCard'
import XojalikHarvestTable from '../../components/ui/xojalik/xojalikHarvestTable/XojalikHarvestTable'
import XojalikPlantedCard from '../../components/ui/xojalik/xojalikPlantedCard/XojalikPlantedCard'
import AgricultureTable from '../../components/ui/xojalik/xojalikPlantedTable/XojalikPlantedTable'
import XojalikShortInfoCard from '../../components/ui/xojalik/xojalikShortInfoCard/XojalikShortInfoCard'

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
				data={{
					start: 'Урожай',
					end: 'Прибыль',
					startValue: '700',
					endValue: '1 000$',
				}}
			/>
			<ThemeText variant='h4' text='Экспорт Импорт' />
			<MapCard start='Экспорт' end='Импорт' />
			<div className='grid grid-cols-2 grid-rows-1 gap-10'>
				<XojalikShortInfoCard
					harvest={
						xojalik ? xojalik['Dán hám dukkakli dán eginleri jámi']['2024'] : 0
					}
				/>
				<XojalikFieldCard />
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
