import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import ThemeText from '../../components/ThemeText'
import XojalikBarChart from '../../components/ui/xojalikBarChart/XojalikBarChart'
import XojalikChartCard from '../../components/ui/xojalikChartCard/XojalikChartCard'
import XojalikCompaniesCard from '../../components/ui/xojalikCompaniesCard/XojalikCompaniesCard'
import XojalikFieldCard from '../../components/ui/xojalikFieldCard/XojalikFieldCard'
import XojalikHarvestTable from '../../components/ui/xojalikHarvestTable/XojalikHarvestTable'
import XojalikMapCard from '../../components/ui/xojalikMapCard/XojalikMapCard'
import XojalikPlantedCard from '../../components/ui/xojalikPlantedCard/XojalikPlantedCard'
import XojalikPlantedTable from '../../components/ui/xojalikPlantedTable/XojalikPlantedTable'
import XojalikShortInfoCard from '../../components/ui/xojalikShortInfoCard/XojalikShortInfoCard'

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
		<div className='space-y-10'>
			<section>
				<ThemeText variant='h4' text='Сельское хозяйство' />
				<Typography variant='body2' color='grey'>
					Последний обновления 10.03.2025
				</Typography>

				<XojalikChartCard />
			</section>
			<section>
				<ThemeText variant='h4' text='Экспорт Импорт' />
				<XojalikMapCard />
			</section>
			<section className='grid grid-cols-2 grid-rows-1 gap-10 mb-5'>
				<XojalikShortInfoCard
					harvest={
						xojalik ? xojalik['Dán hám dukkakli dán eginleri jámi']['2024'] : 0
					}
				/>
				<XojalikFieldCard />
			</section>

			<section>
				<ThemeText variant='h4' text='Размещение' />
				<Typography variant='h6' color='gray'>
					за 2025 год
				</Typography>
				<Box className='grid grid-cols-2 grid-rows-[350px] gap-5 mt-5'>
					<XojalikPlantedTable />
					<XojalikHarvestTable />
				</Box>
			</section>
			<section>
				<Box className='grid grid-cols-[3fr_1fr] grid-rows-[350px] gap-5 mt-5'>
					<XojalikBarChart />
					<XojalikCompaniesCard />
				</Box>
			</section>
			<section>
				<XojalikPlantedCard />
			</section>
		</div>
	)
}

export default Xojalik
