import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
	Box,
	Button,
	Menu,
	MenuItem,
	Typography,
	useTheme,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from 'recharts'

interface AgeDataItem {
	name: string
	uv: number
}

function HomeAgesCard() {
	const [chartData, setChartData] = useState<AgeDataItem[]>([])
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [selectedYear, setSelectedYear] = useState<string | null>(null)
	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = (year?: string) => {
		if (year) setSelectedYear(year)
		setAnchorEl(null)
	}

	const theme = useTheme()
	const { data: ages } = useQuery({
		queryKey: ['ages'],
		queryFn: async () => {
			const res = await fetch(
				'/db/ages/turaqlı_xalıq_sanı_jas_kategoriyalar_boyınsha_tek_qaralpaqstan.json'
			)
			if (!res.ok) {
				throw new Error('Ошибка загрузки данных')
			}
			return res.json()
		},
	})

	// Получаем список годов из данных
	const years = useMemo(() => {
		if (!ages) return []
		return Object.keys(ages['Qaraqalpaqstan Respublikası']).sort().reverse()
	}, [ages])

	// Обновляем selectedYear на самый свежий при первом получении данных
	useEffect(() => {
		if (years.length > 0 && !selectedYear) {
			setSelectedYear(years[0])
		}
	}, [years, selectedYear])

	// Формируем chartData при изменении selectedYear
	useEffect(() => {
		if (ages && selectedYear) {
			const yearData = ages['Qaraqalpaqstan Respublikası'][selectedYear]
			if (!yearData) return

			const formattedData = Object.entries(yearData)
				.filter(([key]) => key !== 'total')
				.map(([key, value]) => ({
					name: key === 'up to 80' ? 'за 80' : `до ${key}`,
					uv: Number(value),
				}))

			setChartData(formattedData)
		}
	}, [ages, selectedYear])

	if (!selectedYear || chartData.length === 0) return <p>Загрузка...</p>

	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Typography variant='h6' fontWeight='bold'>
				Население
			</Typography>
			<div>
				<Button
					disableFocusRipple
					disableRipple
					variant='outlined'
					onClick={handleClick}
					endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					sx={{
						border: 'none',
						color: '#8D8A94',
						padding: '0',
					}}
				>
					<span className='lowercase mr-1'>за</span> {selectedYear}
				</Button>
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={() => handleClose()}
					sx={{
						'& .MuiPaper-root': {
							bgcolor: theme.palette.background.default,
						},
					}}
				>
					{years.slice(0, 4).map(year => (
						<MenuItem
							key={year}
							selected={selectedYear === year}
							onClick={() => handleClose(year)}
						>
							{year}
						</MenuItem>
					))}
				</Menu>
			</div>
			<ResponsiveContainer height={135}>
				<BarChart
					data={chartData}
					margin={{
						top: 20,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<XAxis dataKey='name' tickLine={false} axisLine={false} />
					<Bar dataKey='uv' label={{ position: 'top' }}>
						{chartData.map((entry, index) => (
							<Cell
								key={`cell-${index}-${entry.name}`}
								fill='#7367F0'
								radius={20}
								width={10}
							/>
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</Box>
	)
}

export default HomeAgesCard
