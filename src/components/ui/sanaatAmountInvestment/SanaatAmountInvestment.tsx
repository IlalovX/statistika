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
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import YearDropdown from '../../YearDropdown'
import SanaatModaAmountlTable from './SanaatModaAmountlTable'
import dollar from '/svg/dollar.svg'

const categories = [
	{
		title: 'IT проекты',
		amount: '$0 млн',
		change: '+0%',
		color: '#007bff',
		icon: '💻',
	},
	{
		title: 'Сельское хозяйство',
		amount: '$0 млн',
		change: '-0%',
		color: '#d9534f',
		icon: '🌾',
	},
	{
		title: 'Промышленность',
		amount: '$0 млн',
		change: '+0%',
		color: '#d43f3a',
		icon: '🏭',
	},
	{
		title: 'Бизнес',
		amount: '$0 млн',
		change: '-0%',
		color: '#28a745',
		icon: '💼',
	},
]

const data = [
	{ name: 'Segment 1', value: 25, color: '#1A237E' },
	{ name: 'Segment 2', value: 10, color: '#E57373' },
	{ name: 'Segment 3', value: 35, color: '#1E88E5' },
	{ name: 'Segment 4', value: 10, color: '#8E244D' },
	{ name: 'Segment 5', value: 10, color: '#388E3C' },
	{ name: 'Segment 6', value: 50, color: '#E0E0E0' },
]
function SanaatAmountInvestment() {
	const theme = useTheme()
	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Typography variant='h6' fontWeight='bold'>
				Сумма инвестиции
			</Typography>
			<YearDropdown />
			<div className='grid grid-cols-2 gap-5'>
				<Box position='relative' width={200} height={200} className='m-auto'>
					<ResponsiveContainer width='100%' height='100%'>
						<PieChart>
							<Pie
								data={data}
								cx='50%'
								cy='50%'
								innerRadius={60}
								outerRadius={80}
								paddingAngle={3}
								dataKey='value'
								startAngle={90}
								endAngle={-270}
							>
								{data.map((entry, index) => (
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
							$0
						</Typography>
						<Typography variant='body2' fontWeight='bold'>
							МЛН
						</Typography>
					</Box>
				</Box>
				<Box sx={{ paddingRight: 2 }}>
					<header className='flex gap-2 mb-4'>
						<img src={dollar} alt='' width={50} height={50} />
						<div>
							<Typography variant='body1'>Полученные инвестиции</Typography>
							<Typography variant='h6'>$ 0</Typography>
						</div>
					</header>
					<Divider />
					<Box mt={2}>
						<List sx={{ padding: 0 }}>
							{categories.map((item, index) => (
								<ListItem key={index} sx={{ padding: 0 }}>
									<ListItemAvatar>
										<Avatar sx={{ bgcolor: '#f0f0f0' }}>{item.icon}</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={
											<Box
												display='flex'
												justifyContent='space-between'
												alignItems='center'
											>
												<Typography sx={{ color: item.color, fontWeight: 600 }}>
													{item.title}
												</Typography>
												<Box display='flex' alignItems='center'>
													<Typography
														variant='body2'
														sx={{ fontWeight: 600, mr: 1 }}
													>
														{item.amount}
													</Typography>
													<Typography
														variant='body2'
														sx={{
															color: item.change.includes('+')
																? 'green'
																: 'red',
														}}
													>
														{item.change}
													</Typography>
												</Box>
											</Box>
										}
									/>
								</ListItem>
							))}
						</List>
						<div className='flex justify-end items-center'>
							<SanaatModaAmountlTable />
						</div>
					</Box>
				</Box>
			</div>
		</Box>
	)
}

export default SanaatAmountInvestment
