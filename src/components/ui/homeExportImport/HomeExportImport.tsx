import { Box, Typography } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

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
	const [pData, setPData] = useState<number[]>(Array(12).fill(0))
	const [uData, setUData] = useState<number[]>(Array(12).fill(0))
	const [months, setMonths] = useState<string[]>([])

	const {
		data: exports,
		isLoading: isLoadingExports,
		isError: isErrorExports,
	} = useQuery({
		queryKey: ['export'],
		queryFn: async () => {
			const res = await fetch('/db/export/eksport_ayma_ay.json')
			if (!res.ok) {
				throw new Error('Ошибка загрузки данных')
			}
			return res.json()
		},
	})

	const {
		data: imports,
		isLoading: isLoadingImports,
		isError: isErrorImports,
	} = useQuery({
		queryKey: ['import'],
		queryFn: async () => {
			const res = await fetch('/db/import/import_kólemi_ayma_ay.json')
			if (!res.ok) {
				throw new Error('Ошибка загрузки данных')
			}
			return res.json()
		},
	})

	const getYearData = (data: any, code: string) => {
		if (!data) return Array(12).fill(0)
		const region = data[0].data.find((item: any) => item.Code == code)

		if (!region) return Array(12).fill(0)

		const monthKeys = Object.keys(region)
			.filter(key => key.match(/^\d{4}-M\d{2}$/))
			.sort()

		const last12Months = monthKeys.slice(-12)

		const monthLabels = last12Months.map(month => {
			const [, m] = month.split('-')
			return monthNames[m] || month
		})

		setMonths(monthLabels)

		return last12Months.map(month =>
			parseFloat((region[month] || '0').toString().replace(',', '.'))
		)
	}

	useEffect(() => {
		if (exports) setPData(getYearData(exports, '1735'))
		if (imports) setUData(getYearData(imports, '1735'))
	}, [exports, imports])

	if (isLoadingExports || isLoadingImports) return <p>Загрузка данных...</p>
	if (isErrorExports || isErrorImports) return <p>Ошибка загрузки данных</p>

	return (
		<Box className='flex flex-col justify-between h-full border-r-2 border-gray-200'>
			<header>
				<div className='font-bold flex gap-2'>
					<Typography className='text-[#7367F0]'>Экспорт</Typography>
					<Typography className='text-[#FF9F43]'>Импорт</Typography>
				</div>
				<p className='text-gray-400'>за последние 12 месяцев</p>
			</header>

			<BarChart
				height={300}
				borderRadius={10}
				series={[
					{
						data: pData,
						id: 'pvId',
						stack: 'stack1',
						color: '#7367F0',
						valueFormatter: value => `$${value} млн`,
					},
					{
						data: uData.map(value => -value),
						id: 'uvId',
						stack: 'stack1',
						color: '#FF9F43',
						valueFormatter: value => `$${Math.abs(value as number)} млн `,
					},
				]}
				xAxis={[
					{
						data: months,
						scaleType: 'band',
						tickPlacement: 'middle',
						tickSize: 10,
					},
				]}
			/>
		</Box>
	)
}
