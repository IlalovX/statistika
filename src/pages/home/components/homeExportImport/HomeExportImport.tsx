import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Typography, useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useMemo, useState } from 'react'
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from 'recharts'
import { useGetExportImport } from '../../../../hooks/useHome'

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
	const { data } = useGetExportImport()
	const theme = useTheme()

	const [selected, setSelected] = useState<'export' | 'import'>('export')
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [year, setYear] = useState('2025')
	const open = Boolean(anchorEl)

	const availableYears = useMemo(() => {
		if (!data) return []
		const years = data[selected] ? Object.keys(data[selected]) : []
		return years.sort((a, b) => Number(a) - Number(b)).reverse()
	}, [data, selected])

	const chartData = useMemo(() => {
		if (!data) return []
		const source = data[selected]?.[+year]
		if (!source) return []

		return monthNames.map((name, i) => {
			const key = `M${(i + 1).toString().padStart(2, '0')}`
			const value = source?.[key] ?? 0
			return { name, value }
		})
	}, [data, selected, year])

	const totalValue = useMemo(() => {
		return chartData.reduce((sum, item) => sum + item.value, 0)
	}, [chartData])

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
							variant='outlined'
							onClick={handleClick}
							disableFocusRipple
							disableRipple
							sx={{ border: 'none', padding: 0, textTransform: 'none', gap: 0 }}
						>
							<Box display='flex' alignItems='center' gap={0}>
								{year}
								{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
							</Box>
						</Button>
						<Menu
							anchorEl={anchorEl}
							open={open}
							onClose={() => handleClose()}
							MenuListProps={{ 'aria-labelledby': 'basic-button' }}
							sx={{
								'& .MuiPaper-root': {
									bgcolor: theme.palette.background.default,
								},
							}}
							PaperProps={{
								style: {
									maxHeight: 160,
								},
							}}
						>
							{availableYears.length > 0 ? (
								availableYears.map(y => (
									<MenuItem
										key={y}
										onClick={() => handleClose(y)}
										sx={{ padding: 1 }}
									>
										{y}
									</MenuItem>
								))
							) : (
								<MenuItem disabled>Нет данных</MenuItem>
							)}
						</Menu>
					</div>
				</Box>
			</header>

			<div>
				<Typography variant='h6' className='!font-bold'>
					{(totalValue * 10 ** 6).toLocaleString('ru-RU')} млн.доллар
				</Typography>
				<Typography variant='body2' className=' font-semibold text-neutral-500'>
					Годовой
				</Typography>
			</div>

			<ResponsiveContainer height={250}>
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
