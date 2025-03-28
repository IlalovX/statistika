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
import YearDropdown from '../../YearDropdown'
import HomeDoughnut from '../homeDoughnut/HomeDoughnut'
import SanaatModalProjects from './SanaatModalProjects'
import arrowup from '/svg/Polygon 2 (1).svg'
import { default as icon } from '/svg/туризм.svg'
function SanaatInvestmentProjects() {
	const data = {
		'IT проекты': { '2025': '0' },
		'Сельское хозяйство': { '2025': '0' },
		Промышленность: { '2025': '0' },
		Бизнес: { '2025': '0' },
		total: { '2025': '0' },
	}

	const theme = useTheme()
	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<div className='flex justify-between items-center'>
				<div className='flex flex-col gap-5'>
					<div>
						<Typography variant='h6' fontWeight='bold'>
							Проекты
						</Typography>
						<YearDropdown />
					</div>
					<div>
						<Typography variant='h6'>0</Typography>
						<p className='flex gap-1 items-center'>
							<img src={arrowup} alt='' />
							0%
						</p>
					</div>
				</div>
				<div className='mt-5'>
					<HomeDoughnut total={data?.total['2025']} />
				</div>
			</div>
			<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
				{Object.entries(data ?? {})
					.filter(([key]) => key !== 'total')
					.map(([key, values]) => {
						const yearData = values as { 2025: string }
						return (
							<ListItem
								key={key}
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: 2,
									padding: '0 0 0 2px',
									margin: '4px 0',
								}}
							>
								<ListItemAvatar>
									<Avatar sx={{ bgcolor: '#F3F4F6' }}>
										<img src={icon} alt='icon' width={24} height={24} />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={key}
									primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
								/>
								<Typography
									variant='body1'
									fontWeight={600}
									className='text-[20px]'
								>
									{yearData['2025'] ?? 0}
								</Typography>{' '}
								<Typography
									variant='body2'
									color='green'
									className='text-[11px]'
								>
									0%
								</Typography>
							</ListItem>
						)
					})}
			</List>
			<div className='flex justify-end items-center'>
				<SanaatModalProjects />
			</div>
		</Box>
	)
}

export default SanaatInvestmentProjects
