import { ArrowUpward } from '@mui/icons-material'
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
import { YearSelect } from '../../../../components/common/YearSelect/YearSelect'
import HomeDoughnut from '../../../../components/ui/homeDoughnut/HomeDoughnut'
import { currentYear } from '../../../../const/monthsOfYear'
import { useClientWaterLimit } from '../../../../hooks/useAgriculture'
import { getPercentColor } from '../../../../utils/getPercentDisplay'
import WaterModal from './WaterModal'

function Water() {
	const [year, setYear] = useState(currentYear)
	const { data: water } = useClientWaterLimit(year)

	const theme = useTheme()

	return (
		<Box
			className='h-full w-full rounded-2xl p-4 '
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Box className='flex flex-col gap-5'>
				<div className='flex justify-between items-center'>
					<div>
						<div className='flex gap-5'>
							<div>
								<Typography variant='h6' fontWeight='bold'>
									Лимит воды
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									за последний год
								</Typography>
							</div>
							<YearSelect onChange={setYear} value={year} />
						</div>

						<div className='flex items-center gap-2 mt-2'>
							<Typography variant='h5' fontWeight={600}>
								100
							</Typography>
							<ArrowUpward
								fontSize='small'
								style={{
									color: getPercentColor(water?.total.percent.status || 'up'),
								}}
							/>
							<Typography
								variant='body2'
								sx={{
									color: getPercentColor(water?.total.percent.status || 'up'),
									fontWeight: 500,
								}}
							>
								{water?.total.value}%
							</Typography>
						</div>
					</div>
					<HomeDoughnut total={String(water?.total.value as number)} />
				</div>
				<div className='flex flex-col'>
					<List>
						{water?.by_product.slice(0, 6).map((item, i) => (
							<ListItem
								key={i}
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: 2,
									px: 0,
									py: 0.5,
								}}
							>
								<ListItemAvatar>
									<Avatar sx={{ bgcolor: '#F3F4F6' }}>
										<img src='/svg/xojalik/water-icon.svg' alt='' width={20} />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={
										<Typography fontWeight={500}>{item.product}</Typography>
									}
								/>
								<Typography fontWeight={600}>{item.value}</Typography>
							</ListItem>
						))}
					</List>
					<WaterModal data={water?.by_product || []} />
				</div>
			</Box>
		</Box>
	)
}

export default Water
