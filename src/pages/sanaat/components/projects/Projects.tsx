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
import { useGetInvestmentProjects } from '../../../../hooks/useInvestment'
import {
	getPercentColor,
	getPercentSign,
} from '../../../../utils/getPercentDisplay'
import ProjectsModal from './ProjectsModal'
import arrowup from '/svg/Polygon 2 (1).svg'

interface Props {
	years: number[]
}

function Projects({ years }: Props) {
	const [year, setYear] = useState(currentYear)
	const { data: projects } = useGetInvestmentProjects(year)

	const theme = useTheme()
	return (
		<Box
			className='shadow-xl rounded-2xl p-4 flex flex-col justify-between'
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
						<YearSelect onChange={setYear} value={year} years={years} />
					</div>
					<div>
						<p
							className='flex gap-1 items-center'
							style={{
								color: getPercentColor(projects?.total.percent.status || 'up'),
							}}
						>
							<img src={arrowup} alt='' />
							{projects?.total.percent.value}%
						</p>
					</div>
				</div>
				<div className='mt-5'>
					<HomeDoughnut total={String(projects?.total.value)} />
				</div>
			</div>
			<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
				{projects?.by_project.slice(0, 6).map((item, index) => {
					return (
						<ListItem
							key={index}
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
									<img
										src={'/svg/projects/Background.svg'}
										alt='icon'
										width={24}
										height={24}
									/>
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={item.project_name}
								primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
							/>
							<Typography
								variant='body1'
								fontWeight={600}
								className='text-[20px]'
							>
								{item.value}
							</Typography>{' '}
							<Typography
								variant='body2'
								sx={{
									color: getPercentColor(item.percent.status || 'up'),
									fontWeight: 500,
								}}
							>
								{getPercentSign(item.percent.status || 'up')}
								{item.percent.value}%
							</Typography>
						</ListItem>
					)
				})}
			</List>
			<ProjectsModal data={projects?.by_project || []} />
		</Box>
	)
}

export default Projects
