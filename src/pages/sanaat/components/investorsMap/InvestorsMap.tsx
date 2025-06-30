import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	useTheme,
} from '@mui/material'
import { useState } from 'react'
import { MonthSelect } from '../../../../components/common/MonthSelect/MonthSelect'
import { YearSelect } from '../../../../components/common/YearSelect/YearSelect'
import ThemeText from '../../../../components/ThemeText'
import { currentMonth, currentYear } from '../../../../const/monthsOfYear'
import { useGetInvestmentInvestors } from '../../../../hooks/useInvestment'
import { formatCompactNumber } from '../../../../utils/formatCompactNumber'
import InvestorsMapModal from './InvestorsMapModal'
import EARTH from '/svg/Earth.svg'
import { default as arrowUp } from '/svg/Polygon 2 (1).svg'
import { default as arrowDown } from '/svg/Polygon 2.svg'

interface Props {
	years: number[]
}

function InvestorsMap({ years }: Props) {
	const [selectedYear, setSelectedYear] = useState(currentYear)
	const [selectedMonth, setSelectedMonth] = useState(currentMonth)
	const { data: investors = [] } = useGetInvestmentInvestors(
		selectedYear,
		selectedMonth.value
	)

	const theme = useTheme()
	return (
		<>
			<div className='flex justify-between items-center'>
				<header>
					<ThemeText variant='h4' text='Инвесторы из зарубежа' />
					<Typography variant='h6' color='gray'>
						с начало года
					</Typography>
				</header>
				<div className='flex gap-4 my-5'>
					<YearSelect
						value={selectedYear}
						onChange={setSelectedYear}
						years={years}
					/>

					<MonthSelect value={selectedMonth} onChange={setSelectedMonth} />
				</div>
			</div>
			<Box
				className={`shadow-2xl w-full rounded-2xl p-2.5 my-5 grid grid-cols-2 `}
				sx={{
					bgcolor: 'background.paper',
					border: `1px solid ${theme.palette.divider}`,
				}}
			>
				<Box className='flex items-center justify-center'>
					<img src={EARTH} alt='' />
				</Box>

				<Box className='flex  flex-col justify-between gap-2'>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow
									sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}
								>
									<TableCell>Страна</TableCell>
									<TableCell>Количество</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{investors.map((item, index) => (
									<TableRow
										key={index}
										sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}
									>
										<TableCell>{item.country.data.official}</TableCell>
										<TableCell
											align='right'
											sx={{
												display: 'grid',
												gridGap: '5px',
												gridTemplateColumns: '1fr 1fr 1fr',
											}}
										>
											<span className='3xl whitespace-nowrap'>
												{formatCompactNumber(item.amount)}
											</span>
											<img src={index % 2 !== 0 ? arrowDown : arrowUp} />
											<span className='3xl'>+0%</span>{' '}
											{/* или можно посчитать %, если будет поле */}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<InvestorsMapModal investors={investors} />
				</Box>
			</Box>
		</>
	)
}

export default InvestorsMap
