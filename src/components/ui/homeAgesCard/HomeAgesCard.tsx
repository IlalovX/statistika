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
import { useState } from 'react'
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from 'recharts'
import { useAgeCategoryPopulationStat } from '../../../hooks/useAgeCategoryPopulationStat'

interface AgeDataItem {
	name: string
	uv: number
}

const years = [2025, 2024, 2023, 2022]

function HomeAgesCard() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [selectedYear, setSelectedYear] = useState<number>(2025)
	const open = Boolean(anchorEl)
	const theme = useTheme()

	const { data, isLoading } = useAgeCategoryPopulationStat(selectedYear)

	const chartData: AgeDataItem[] = data.map((d) => ({
		name: d.category,
		uv: d.total,
	}))

	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Typography variant='h6' fontWeight='bold'>
				Население по возрасту
			</Typography>
			<div>
				<Button
					disableFocusRipple
					disableRipple
					variant='outlined'
					onClick={(e) => setAnchorEl(e.currentTarget)}
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
					onClose={() => setAnchorEl(null)}
					sx={{
						'& .MuiPaper-root': {
							bgcolor: theme.palette.background.default,
						},
					}}
				>
					{years.map((year) => (
						<MenuItem
							key={year}
							selected={selectedYear === year}
							onClick={() => {
								setSelectedYear(year)
								setAnchorEl(null)
							}}
						>
							{year}
						</MenuItem>
					))}
				</Menu>
			</div>

			{isLoading ? (
				<p>Загрузка...</p>
			) : (
				<ResponsiveContainer height={135}>
					<BarChart
						data={chartData}
						margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
						barCategoryGap={'50%'}
					>
						<XAxis dataKey='name' tickLine={false} axisLine={false} />
						<Bar
							dataKey='uv'
							label={{
								position: 'top',
								formatter: (value: number) => `${(value / 1000).toFixed(1)}`,
							}}
						>
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
			)}
		</Box>
	)
}

export default HomeAgesCard
