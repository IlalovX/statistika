import { BarChart } from '@mui/x-charts/BarChart'

export default function HomeExportImport() {
	return (
		<BarChart
			width={540}
			height={300}
			tooltip={{ trigger: 'none' }}
			series={[
				{ data: pData, id: 'pvId', stack: 'stack1' },
				{ data: uData, id: 'uvId', stack: 'stack1' },
			]}
			xAxis={[
				{
					data: shortMonths,
					scaleType: 'band',
					tickPlacement: 'middle',
					tickSize: 10,
				},
			]}
		/>
	)
}
const pData = [200, 150, 200, 180, 100, 70, 210, 140, 180]
const uData = [-100, -150, -180, -150, -90, -40, -70, -90, -200]

const shortMonths = [
	'Ян',
	'Фев',
	'Мар',
	'Апр',
	'Май',
	'Июн',
	'Июл',
	'Авг',
	'Сен',
]
