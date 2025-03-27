import { Typography, useTheme } from '@mui/material'
import MapCard from '../../components/mapCard/MapCard'
import ThemeText from '../../components/ThemeText'
import SanaatJobsCreatedCard from '../../components/ui/sanaaJobsCreatedCard/SanaatJobsCreatedCard'
import SanaatAmountInvestment from '../../components/ui/sanaatAmountInvestment/SanaatAmountInvestment'
import SanaatChartCard from '../../components/ui/sanaatChartCard/SanaatChartCard'
import SanaatIndicators from '../../components/ui/sanaatIndicators/SanaatIndicators'
import SanaatInvestmentProjects from '../../components/ui/sanaatInvestmentProjects/SanaatInvestmentProjects'
import SanaatQQProjects from '../../components/ui/sanaatQQProjects/SanaatQQProjects'
import SanaatVolumeProducts from '../../components/ui/sanaatVolumeProducts/SanaatVolumeProducts'

function Sanaat() {
	const theme = useTheme()
	return (
		<div className='space-y-10'>
			<section>
				<ThemeText variant='h4' text='Промышленность' />
				<p className='text-gray-400'>
					Последний обновления
					<span
						className='font-bold '
						style={{
							color: theme.palette.mode === 'light' ? 'black' : 'white',
						}}
					>
						10.03.2025
					</span>
				</p>
				<SanaatChartCard />
			</section>
			<section>
				<ThemeText variant='h4' text='Показатели по районам' />
				<Typography variant='h6' color='gray'>
					с начало года
				</Typography>
				<SanaatIndicators />
			</section>
			<br />
			<br />
			<section>
				<ThemeText variant='h4' text='Объем промышленной продукции' />
				<SanaatVolumeProducts />
			</section>
			<section>
				<ThemeText variant='h4' text='Инвестиция' />
				<Typography variant='h6' color='gray'>
					с начало года
				</Typography>
				<div className='grid grid-cols-[1fr_3fr] gap-2 mb-6'>
					<SanaatInvestmentProjects />
					<SanaatAmountInvestment />
				</div>
				<SanaatJobsCreatedCard />
			</section>

			<section>
				<ThemeText variant='h4' text='Инвестиционные проекты по районам' />
				<Typography variant='h6' color='gray'>
					с начало года
				</Typography>
				<SanaatQQProjects />
			</section>
			<section>
				<ThemeText variant='h4' text='Инвесторы из зарубежа' />
				<Typography variant='h6' color='gray'>
					с начало года
				</Typography>
				<MapCard end='' start='' />
			</section>
		</div>
	)
}

export default Sanaat
