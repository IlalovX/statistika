import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import {
	Bar,
	BarChart,
	Cell,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts'
import HomeExportImportButton from '../homeExportImportButton/HomeExportImportButton'

const monthNames: { [key: string]: string } = {
	M01: 'Янв',
	M02: 'Фев',
	M03: 'Март',
	M04: 'Апр',
	M05: 'Май',
	M06: 'Июн',
	M07: 'Июл',
	M08: 'Авг',
	M09: 'Сен',
	M10: 'Окт',
	M11: 'Ноя',
	M12: 'Дек',
}

export default function HomeExportImport() {
	const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
		[]
	)
	const [selected, setSelected] = useState<'export' | 'import'>('export')

	const { data: exports } = useQuery({
		queryKey: ['export'],
		queryFn: async () => {
			const res = await fetch('/db/export/eksport_ayma_ay.json')
			if (!res.ok) throw new Error('Ошибка загрузки данных')
			return res.json()
		},
	})

	const { data: imports } = useQuery({
		queryKey: ['import'],
		queryFn: async () => {
			const res = await fetch('/db/import/import_kólemi_ayma_ay.json')
			if (!res.ok) throw new Error('Ошибка загрузки данных')
			return res.json()
		},
	})

	const getYearData = (data: any, code: string) => {
		if (!data) return []

		const region = data[0].data.find((item: any) => item.Code === code)
		if (!region) return []

		const monthKeys = Object.keys(region)
			.filter(key => key.match(/^\d{4}-M\d{2}$/))
			.sort()

		const last12Months = monthKeys.slice(-12)

		return last12Months.map(month => ({
			name: monthNames[month.split('-')[1]] || month,
			value: parseFloat(region[month]?.toString().replace(',', '.') || '0'),
		}))
	}

	useEffect(() => {
		if (exports && selected === 'export') {
			setChartData(getYearData(exports, '1735'))
		}
		if (imports && selected === 'import') {
			setChartData(getYearData(imports, '1735'))
		}
	}, [exports, imports, selected])

	return (
		<Box className='flex flex-col justify-between h-full w-full p-4 '>
			<header className='flex justify-between '>
				<div className='font-bold  '>
					<div className='flex gap-4'>
						<Typography
							className={`cursor-pointer ${selected === 'export' ? 'text-[#7367F0] font-bold' : 'text-gray-500'}`}
							onClick={() => setSelected('export')}
						>
							Экспорт
						</Typography>
						<Typography
							className={`cursor-pointer ${selected === 'import' ? 'text-[#FF9F43] font-bold' : 'text-gray-500'}`}
							onClick={() => setSelected('import')}
						>
							Импорт
						</Typography>
					</div>
				</div>
				<Box className='flex  items-center justify-start gap-8'>
					<HomeExportImportButton />
				</Box>
			</header>
			<ResponsiveContainer>
				<BarChart
					data={chartData}
					margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
					barCategoryGap='50%'
				>
					<XAxis
						dataKey='name'
						tickLine={false}
						axisLine={false}
						tick={{ textAnchor: 'middle', fontSize: 12 }}
						interval={0}
					/>

					<YAxis tickLine={false} axisLine={false} />
					<Bar label={{ position: 'top' }} dataKey='value'>
						{chartData.map((_, index) => (
							<Cell
								key={`cell-${index}`}
								fill={selected === 'export' ? '#7367F0' : '#FF9F43'}
								radius={18}
								width={15}
							/>
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</Box>
	)
}
