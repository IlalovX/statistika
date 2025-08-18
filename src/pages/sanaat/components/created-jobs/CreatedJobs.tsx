import { Box, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { YearSelect } from '../../../../components/common/YearSelect/YearSelect'
import { useGetInvestmentWorkplaces } from '../../../../hooks/useInvestment'
import CreatedJobsModal from './CreatedJobsModal'

const currentYear = new Date().getFullYear()

interface Props {
	years: number[]
}

function CreatedJobs({ years }: Props) {
	const theme = useTheme()
	const [selectedYear, setSelectedYear] = useState(currentYear)
	const { data: workplaces = [] } = useGetInvestmentWorkplaces(selectedYear)

	const isDarkMode = theme.palette.mode === 'dark'
	const total = workplaces.reduce((acc, item) => acc + item.workplaces, 0)

	// Разделим список на 2 колонки
	const midIndex = Math.ceil(workplaces.length / 2)
	const leftColumn = workplaces.slice(0, midIndex)
	const rightColumn = workplaces.slice(midIndex)

	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<header className='flex justify-between items-center p-4'>
				<Typography variant='h6' fontWeight='bold'>
					Созданные рабочие места
				</Typography>
				<YearSelect
					onChange={setSelectedYear}
					value={selectedYear}
					years={years}
				/>
			</header>

			<div className='grid grid-cols-[30%_70%] grid-rows-[400px]'>
				<div className='flex items-center justify-center '>
					<div className='relative w-50 h-50 flex items-center justify-center'>
						<div className='absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 rounded-full p-4'>
							<div
								className='w-full h-full rounded-full flex flex-col items-center justify-center'
								style={{
									backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
									color: isDarkMode ? '#fff' : '#000',
								}}
							>
								<Typography variant='h5' fontWeight='bold'>
									{total}
								</Typography>
								<span className='text-green-500 text-xs'>Всего</span>
							</div>
						</div>
					</div>
				</div>

				{/* Список в 2 колонки */}
				<Box display='grid' gridTemplateColumns='1fr 1fr' gap={2} padding={2}>
					{[leftColumn, rightColumn].map((column, colIndex) => (
						<Box key={colIndex} display='flex' flexDirection='column' gap={1}>
							{column.map((item, index) => (
								<Box
									key={index}
									display='flex'
									justifyContent='space-between'
									alignItems='center'
									p={1}
									sx={{
										borderBottom: `1px solid ${theme.palette.divider}`,
									}}
								>
									<Typography variant='body2'>{item.project_name}</Typography>
									<Typography fontWeight='bold' color='green'>
										+{item.workplaces}
									</Typography>
								</Box>
							))}
						</Box>
					))}
				</Box>
			</div>

			<div className='flex justify-end items-center'>
				<CreatedJobsModal data={workplaces} />
			</div>
		</Box>
	)
}

export default CreatedJobs
