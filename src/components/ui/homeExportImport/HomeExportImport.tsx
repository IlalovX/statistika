import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
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

const monthNames: string[] = [
	'Янв',
	'Фев',
	'Март',
	'Апр',
	'Май',
	'Июн',
	'Июл',
	'Авг',
	'Сен',
	'Окт',
	'Ноя',
	'Дек',
]

export default function HomeExportImport() {
	const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
		[]
	)
	const [selected, setSelected] = useState<'export' | 'import'>('export')
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [year, setYear] = useState('2025')
	const open = Boolean(anchorEl)

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

	const getYearData = (data: any, code: string, year: string) => {
		if (!data) return []

		const region = data[0].data.find((item: any) => item.Code === code)
		if (!region) return []

		return monthNames.map((monthName, index) => {
			const key = `${year}-M${(index + 1).toString().padStart(2, '0')}`
			const valueStr = region[key]?.toString().replace(',', '.') || '0'
			const value = parseFloat(valueStr)

			return {
				name: monthName,
				value: isNaN(value) ? 0 : value,
			}
		})
	}

	useEffect(() => {
		if (exports && selected === 'export') {
			setChartData(getYearData(exports, '1735', year))
		}
		if (imports && selected === 'import') {
			setChartData(getYearData(imports, '1735', year))
		}
	}, [exports, imports, selected, year])

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = (selectedYear?: string) => {
		if (selectedYear) setYear(selectedYear)
		setAnchorEl(null)
	}

	return (
		<Box className='flex flex-col justify-between h-full w-full p-4'>
			<header className='flex justify-between'>
				<div className='font-bold'>
					<div className='flex gap-4'>
						<Typography
							className={`cursor-pointer ${
								selected === 'export'
									? 'text-[#7367F0] font-bold p-1 border-2 rounded-[5px]'
									: 'text-gray-500 p-1'
							}`}
							onClick={() => setSelected('export')}
						>
							Экспорт
						</Typography>
						<Typography
							className={`cursor-pointer ${
								selected === 'import'
									? 'text-[#FF9F43] font-bold border-2 p-1 rounded-[5px]'
									: 'text-gray-500 p-1'
							}`}
							onClick={() => setSelected('import')}
						>
							Импорт
						</Typography>
					</div>
				</div>
				<Box className='flex items-center justify-start gap-8'>
					<div>
						<Button
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup='true'
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
							endIcon={<KeyboardArrowDownIcon />}
						>
							{year}
						</Button>
						<Menu
							anchorEl={anchorEl}
							open={open}
							onClose={() => handleClose()}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
						>
							{['2025', '2024', '2023'].map(y => (
								<MenuItem
									key={y}
									onClick={() => handleClose(y)}
									sx={{ padding: 1 }}
								>
									{y}
								</MenuItem>
							))}
						</Menu>
					</div>
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
