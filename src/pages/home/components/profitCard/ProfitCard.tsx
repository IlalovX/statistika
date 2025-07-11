import {
	Avatar,
	Box,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	useTheme,
} from '@mui/material'
import { useState } from 'react'
import YearMenu from '../../../../components/common/YearMenu/YearMenu'

const data = [
	{
		id: 1,
		title: 'Туризм',
		value: 0,
		percent: '0%',
		icon: '/svg/profit/OUTLINE.svg',
	},
	{
		id: 2,
		title: 'Қишлоқ хўжалиги',
		value: 0,
		percent: '0%',
		icon: '/svg/profit/промышленность.svg',
	},
	{
		id: 3,
		title: 'Саноат',
		value: 0,
		percent: '0%',
		icon: '/svg/profit/сельское хозяйство.svg',
	},
]
function ProfitCard() {
	const [selectedYear, setSelectedYear] = useState<number>(2025)
	const theme = useTheme()

	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5 '
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<div className='flex justify-between items-center gap-3'>
				<Typography variant='body2' fontWeight='bold'>
					Соҳалар бўйича даромад
				</Typography>

				<YearMenu
					onChange={setSelectedYear}
					selectedYear={selectedYear}
					className='self-start'
				/>
			</div>
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
							margin: '4px 0',
						}}
					>
						<ListItemAvatar sx={{ minWidth: 32 }}>
							<Avatar sx={{ bgcolor: '#F3F4F6', width: 32, height: 32 }}>
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
		</Box>
	)
}

export default ProfitCard
