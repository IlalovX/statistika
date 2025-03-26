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
import { useQuery } from '@tanstack/react-query'
import YearDropdown from '../../YearDropdown'
import HomeDoughnut from '../homeDoughnut/HomeDoughnut'
import arrowup from '/svg/Polygon 2 (1).svg'
import { default as icon } from '/svg/туризм.svg'
function SanaatInvestmentProjects() {
	const { data: companies } = useQuery({
		queryKey: ['economic'],
		queryFn: async () => {
			const res = await fetch(
				'/db/economic/ekonomikalıq_túrleri_boyınsha_jańada_ashılǵan_kárxana_sanları.json'
			)
			if (!res.ok) {
				throw new Error('Ошибка загрузки данных')
			}
			return res.json()
		},
	})
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
						<Typography variant='h6'>100</Typography>
						<p className='flex gap-1 items-center'>
							<img src={arrowup} alt='' />
							15.8%
						</p>
					</div>
				</div>
				<div className='mt-5'>
					<HomeDoughnut total={companies?.total['2025']} />
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
									20%
								</Typography>
							</ListItem>
						)
					})}
			</List>
		</Box>
	)
}

export default SanaatInvestmentProjects
