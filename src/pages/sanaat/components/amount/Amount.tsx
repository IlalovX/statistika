import {
	Avatar,
	Box,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	useTheme,
} from '@mui/material'
import { useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { YearSelect } from '../../../../components/common/YearSelect/YearSelect'
import { PIE_COLORS } from '../../../../const/colors'
import { currentYear } from '../../../../const/monthsOfYear'
import { useGetInvestmentAmount } from '../../../../hooks/useInvestment'
import { formatCompactNumber } from '../../../../utils/formatCompactNumber'
import {
	getPercentColor,
	getPercentSign,
} from '../../../../utils/getPercentDisplay'
import AmountModal from './AmountModal'
import dollar from '/svg/dollar.svg'

interface Props {
	years: number[]
}

function Amount({ years }: Props) {
	const [year, setYear] = useState(currentYear)
	const { data: amount } = useGetInvestmentAmount(year)

	const pieData =
		amount?.by_project?.map((item, index) => ({
			name: item.project_name,
			value: item.value,
			color: PIE_COLORS[index % PIE_COLORS.length], // по порядку, с повторением если данных больше
		})) ?? []

	const theme = useTheme()
	return (
		<Box
			className='shadow-xl rounded-2xl p-4'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<div className='flex justify-between items-center'>
				<Typography variant='h6' fontWeight='bold'>
					Сумма инвестиции
				</Typography>
				<YearSelect value={year} onChange={setYear} years={years} />
			</div>
			<div className='grid grid-cols-2 gap-5'>
				<Box position='relative' width={200} height={200} className='m-auto'>
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
								{pieData?.map((entry, index) => (
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
							${formatCompactNumber(amount?.total.value as number)}
						</Typography>
					</Box>
				</Box>
				<Box sx={{ paddingRight: 2 }}>
					<header className='flex gap-2 mb-4'>
						<img src={dollar} alt='' width={50} height={50} />
						<div>
							<Typography variant='body1'>Полученные инвестиции</Typography>
							<Typography variant='h6'>
								$ {formatCompactNumber(amount?.total.value as number)}
							</Typography>
						</div>
					</header>
					<Divider />
					<Box className='flex flex-col justify-between'>
						<List>
							{amount?.by_project?.slice(0, 4).map((item, index) => (
								<ListItem key={index} sx={{ padding: '0 1' }}>
									<ListItemAvatar>
										<Avatar sx={{ bgcolor: '#f0f0f0' }}></Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={
											<Box
												display='flex'
												justifyContent='space-between'
												alignItems='center'
											>
												<Typography>{item.project_name}</Typography>
												<Box display='flex' alignItems='center'>
													<Typography
														variant='body2'
														sx={{ fontWeight: 600, mr: 1 }}
													>
														{formatCompactNumber(item.value)}
													</Typography>
													<Typography
														variant='body2'
														sx={{ color: getPercentColor(item.percent.status) }}
													>
														{getPercentSign(item.percent.status)}
														{item.percent.value} %
													</Typography>
												</Box>
											</Box>
										}
									/>
								</ListItem>
							))}
						</List>
						<AmountModal data={amount?.by_project ? amount.by_project : []} />
					</Box>
				</Box>
			</div>
		</Box>
	)
}

export default Amount
