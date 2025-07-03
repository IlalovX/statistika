import {
	Box,
	List,
	ListItem,
	ListItemText,
	Typography,
	useTheme,
} from '@mui/material'
import { useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { YearSelect } from '../../../../components/common/YearSelect/YearSelect'
import ThemeText from '../../../../components/ui/ThemeText'
import { PIE_COLORS } from '../../../../const/colors'
import { useGetInvestmentOutput } from '../../../../hooks/useInvestment'
import OutputModal from './OutputModal'

const currentYear = new Date().getFullYear()

const OutputPieChart = () => {
	const [selectedYear, setSelectedYear] = useState(currentYear)
	const { data: output = [] } = useGetInvestmentOutput(selectedYear)

	const pieData =
		output?.map((item, index) => ({
			name: item.industry_type,
			value: item.amount,
			color: PIE_COLORS[index % PIE_COLORS.length], // по порядку, с повторением если данных больше
		})) ?? []

	const totalAmount = output?.reduce((acc, item) => acc + item.amount, 0) ?? 0

	const theme = useTheme()
	return (
		<>
			<div className='flex justify-between items-center'>
				<ThemeText variant='h4' text='Объем промышленной продукции' />
				<YearSelect value={selectedYear} onChange={setSelectedYear} />
			</div>
			<Box
				className='shadow-xl rounded-2xl  my-5 grid grid-cols-2 grid-rows-1 p-5'
				sx={{
					bgcolor: 'background.paper',
					border: `1px solid ${theme.palette.divider}`,
				}}
			>
				<Box position='relative' width={300} height={300} className='m-auto'>
					<ResponsiveContainer width='100%' height='100%'>
						<PieChart>
							<Pie
								data={pieData}
								cx='50%'
								cy='50%'
								innerRadius={60}
								outerRadius={80}
								paddingAngle={3}
								dataKey='value'
								startAngle={90}
								endAngle={-270}
							>
								{pieData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Pie>
						</PieChart>
					</ResponsiveContainer>

					<Box
						position='absolute'
						top='50%'
						left='50%'
						sx={{ transform: 'translate(-50%, -50%)' }}
						textAlign='center'
					>
						<Typography variant='h6' fontWeight='bold'>
							${totalAmount.toLocaleString('ru-RU')}
						</Typography>
						<Typography variant='body2' fontWeight='bold'>
							МЛН
						</Typography>
					</Box>
				</Box>
				<Box className='flex flex-col justify-between'>
					<List>
						{output?.map((item, index) => (
							<ListItem
								key={index}
								sx={{ display: 'flex', justifyContent: 'space-between' }}
							>
								<ListItemText primary={item.industry_type} />
								<Box display='flex' alignItems='center'>
									<Typography fontWeight='bold'>${item.amount} млн</Typography>
									{/* если нужно добавить проценты, то сюда */}
									<Typography fontSize={14} color='green' ml={1}>
										+0.00%
									</Typography>
								</Box>
							</ListItem>
						))}
					</List>
					<OutputModal data={output} />
				</Box>
			</Box>
		</>
	)
}

export default OutputPieChart
