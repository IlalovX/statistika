import {
	Avatar,
	Box,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material'
import HomeWeeklyBarChart from '../homeWeeklyBarChart/HomeWeeklyBarChart'
import ThemeText from '../themeText/ThemeText'

const data = [
	{
		id: 1,
		title: 'Туризм',
		value: 1619,
		percent: '+0.24%',
		icon: '/profit/OUTLINE.svg',
	},
	{
		id: 2,
		title: 'Сельское хозяйство',
		value: 3574,
		percent: '+0.24%',
		icon: '/profit/промышленность.svg',
	},
	{
		id: 3,
		title: 'Промышленность',
		value: 430,
		percent: '+0.24%',
		icon: '/profit/сельское хозяйство.svg',
	},
]
function HomeProfit() {
	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5 '
			sx={{ bgcolor: 'background.paper' }}
		>
			<ThemeText text='Прибыль' variant='h6' />
			<p className='text-gray-400'>за последний месяц</p>
			<List
				sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}
			>
				{data.map(item => (
					<ListItem
						key={item.id}
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 2,
							padding: '0 0 0 2px',
						}}
					>
						<ListItemAvatar sx={{ minWidth: 32 }}>
							<Avatar sx={{ bgcolor: 'transparent', width: 32, height: 32 }}>
								<img src={item.icon} alt='icon' width={24} height={24} />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={item.title}
							primaryTypographyProps={{
								variant: 'body1',
								fontWeight: 500,
								sx: {
									overflow: 'hidden',
									whiteSpace: 'nowrap',
									textOverflow: 'ellipsis',
								},
							}}
						/>
						<Typography
							variant='body1'
							fontWeight={600}
							className='text-[20px]'
						>
							${item.value}
						</Typography>
						<Typography variant='body2' color='green' className='text-[11px]'>
							{item.percent}
						</Typography>
					</ListItem>
				))}
			</List>
			<HomeWeeklyBarChart />
		</Box>
	)
}

export default HomeProfit
