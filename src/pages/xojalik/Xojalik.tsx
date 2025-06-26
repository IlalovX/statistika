import { Box, Typography } from '@mui/material'
import ThemeText from '../../components/ThemeText'
import { useAgricultureLastUpdate } from '../../hooks/useAgriculture'
import ChartCard from './components/ChartCard'
import Companies from './components/companies/Companies'
import District from './components/district/District'
import ExportImport from './components/exportImport/ExportImport'
import Fields from './components/fields/Fields'
import MarketBarChart from './components/MarketBarChart'
import PlantedArea from './components/plantedArea/PlantedArea'
import Summary from './components/summary/Summary'
import Water from './components/water/Water'

function Xojalik() {
	const { data: last_update } = useAgricultureLastUpdate()

	return (
		<div className='space-y-10'>
			<section>
				<ThemeText variant='h4' text='Сельское хозяйство' />
				<Typography variant='body2' color='grey'>
					Последний обновления {last_update}
				</Typography>

				<ChartCard />
			</section>
			<section>
				<ExportImport />
			</section>
			<section className='grid grid-cols-2 grid-rows-1 gap-10 mb-5'>
				<Summary />
				<Fields />
			</section>
			<section>
				<ThemeText variant='h4' text='Размещение' />
				<Box className='grid grid-cols-2 grid-rows-1 gap-5 mt-5'>
					<PlantedArea />
					<div className='flex flex-col justify-between gap-5'>
						<Companies />
						<Water />
					</div>
				</Box>
			</section>
			<section>
				<MarketBarChart />
			</section>
			<section>
				<District />
			</section>
		</div>
	)
}

export default Xojalik
