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

import HomeDoughnut from '../../home/homeDoughnut/HomeDoughnut'
import arrowup from '/svg/Polygon 2 (1).svg'
import { default as icon } from '/svg/туризм.svg'

function XojalikCompaniesCard() {
	const theme = useTheme()
	const companies = {
		Животноводство: { 2024: 0 },
		Земельные: { 2024: 0 },
		Бизнес: { 2024: 0 },
	}

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
						<Typography variant='body1' fontWeight='bold'>
							Сельско-хозяйственный фирмы
						</Typography>
						<Typography variant='body2' fontWeight='bold' color='grey'>
							за последний год
						</Typography>
					</div>
					<div>
						<Typography variant='body2'>0</Typography>
						<p className='flex gap-1 items-center'>
							<img src={arrowup} alt='' />0
						</p>
					</div>
				</div>
				<div className='mt-5'>
					<HomeDoughnut total={'0'} />
				</div>
			</div>
			<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
				{Object.entries(companies ?? {})
					.filter(([key]) => key !== 'total')
					.map(([key, values]) => {
						const yearData = values as Record<string, number>
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
		</Box>
	)
}

export default XojalikCompaniesCard
