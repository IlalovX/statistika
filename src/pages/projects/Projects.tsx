import { Box, Typography, useTheme } from '@mui/material'
import ThemeText from '../../components/ThemeText'
import ProjectsTable from '../../components/ui/projectsTable/ProjectsTable'

const cards = [
	{
		id: 1,
		title: 'Проекты',
		count: 125,
		color: 'text-gray-700',
		icon: '/svg/projects/Background.svg',
	},
	{
		id: 2,
		title: 'Выполняется',
		count: 85,
		color: 'text-green-500',
		icon: '/svg/projects/Background (1).svg',
	},
	{
		id: 3,
		title: 'Опаздывает',
		count: 85,
		color: 'text-red-500',
		icon: '/svg/projects/Background (2).svg',
	},
	{
		id: 4,
		title: 'Безнадежный',
		count: 85,
		color: 'text-orange-500',
		icon: '/svg/projects/Background (3).svg',
	},
	{
		id: 5,
		title: 'Не началось',
		count: 85,
		color: 'text-blue-500',
		icon: '/svg/projects/Background (4).svg',
	},
	{
		id: 6,
		title: 'Отказано',
		count: 85,
		color: 'text-red-500',
		icon: '/svg/projects/Background (4).svg',
	},
]
const tableData = [
	{
		city: 'Нукус',
		initiator: 'Зарубежнефть МЧЖ',
		project: 'Сув таъминоти',
		cost: 7.5,
		jobs: 10,
		launch: '01.12.2025',
		responsible: 'Андижон вилояти ҳокимлиги',
	},
	{
		city: 'Шымбай',
		initiator: 'Kogon parranda qut-baraka MCHJ',
		project: 'Паррандачилик',
		cost: 10.5,
		jobs: 110,
		launch: '01.12.2025',
		responsible: 'Бухоро вилояти ҳокимлиги',
	},
	{
		city: 'Кунград',
		initiator: 'Kogon parranda qut-baraka MCHJ',
		project: 'Паррандачилик',
		cost: 10.5,
		jobs: 110,
		launch: '01.12.2025',
		responsible: 'Бухоро вилояти ҳокимлиги',
	},
	{
		city: 'Амударья',
		initiator: 'Kogon parranda qut-baraka MCHJ',
		project: 'Паррандачилик',
		cost: 10.5,
		jobs: 110,
		launch: '01.12.2025',
		responsible: 'Бухоро вилояти ҳокимлиги',
	},
	{
		city: 'Беруни',
		initiator: 'Kogon parranda qut-baraka MCHJ',
		project: 'Паррандачилик',
		cost: 10.5,
		jobs: 110,
		launch: '01.12.2025',
		responsible: 'Бухоро вилояти ҳокимлиги',
	},
]
function Projects() {
	const theme = useTheme()
	return (
		<div className='space-y-10'>
			<header>
				<ThemeText variant='h4' text='Проекты' />
				<p className='text-gray-400'>
					Последний обновления
					<span
						className='font-bold '
						style={{
							color: theme.palette.mode === 'light' ? 'black' : 'white',
						}}
					>
						10.03.2025
					</span>
				</p>
			</header>

			<section>
				<header>
					<ThemeText variant='h4' text='Краткая информация' />
					<p className='text-gray-400'>сравнее прошлым годом</p>
				</header>
				<div className='grid grid-cols-6 gap-5 mt-4'>
					{cards.map((item, index) => (
						<Box
							key={index}
							className=' shadow-md rounded-xl p-4 space-y-2'
							sx={{
								backgroundColor: 'background.paper',
								border: `1px solid ${theme.palette.divider}`,
							}}
						>
							<div className='flex items-center gap-2'>
								<img src={item.icon} alt='' width={35} height={35} />
								<Typography variant='h6' className='text-2xl font-semibold'>
									{item.count}
								</Typography>
							</div>

							<Typography variant='h6' className={`${item.color} font-bold`}>
								{item.title}
							</Typography>
						</Box>
					))}
				</div>
			</section>

			<section>
				<header>
					<ThemeText variant='h4' text='Информация' />
					<ProjectsTable />
				</header>
			</section>
		</div>
	)
}

export default Projects
