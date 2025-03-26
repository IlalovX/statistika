import { Typography, useTheme } from '@mui/material'
import ThemeText from '../../components/ThemeText'
import SanaatJobsCreatedCard from '../../components/ui/sanaaJobsCreatedCard/SanaatJobsCreatedCard'
import SanaatAmountInvestment from '../../components/ui/sanaatAmountInvestment/SanaatAmountInvestment'
import SanaatChartCard from '../../components/ui/sanaatChartCard/SanaatChartCard'
import SanaatIndicators from '../../components/ui/sanaatIndicators/SanaatIndicators'
import SanaatInvestmentProjects from '../../components/ui/sanaatInvestmentProjects/SanaatInvestmentProjects'
import SanaatVolumeProducts from '../../components/ui/sanaatVolumeProducts/SanaatVolumeProducts'

function Sanaat() {
	const theme = useTheme()
	return (
		<div>
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
			<ThemeText variant='h4' text='Показатели по районам' />
			<Typography variant='h6' color='gray'>
				с начало года
			</Typography>
			<SanaatIndicators />
			<br />
			<br />
			<ThemeText variant='h4' text='Объем промышленной продукции' />
			<SanaatVolumeProducts />
			<ThemeText variant='h4' text='Инвестиция' />
			<Typography variant='h6' color='gray'>
				с начало года
			</Typography>
			<div className='grid grid-cols-[1fr_3fr] gap-2 mb-6'>
				<SanaatInvestmentProjects />
				<SanaatAmountInvestment />
			</div>
			<SanaatJobsCreatedCard />
		</div>
	)
}

export default Sanaat
