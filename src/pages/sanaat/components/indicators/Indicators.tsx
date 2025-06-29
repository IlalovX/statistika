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
import ThemeText from '../../../../components/ThemeText'
import { YearSelect } from '../../../../components/common/YearSelect/YearSelect'
import { currentYear } from '../../../../const/monthsOfYear'
import { useGetInvestmentIndicators } from '../../../../hooks/useInvestment'
import IndicatorsModal from './IndicatorsModal'
import { default as arrowUp } from '/svg/Polygon 2 (1).svg'
import { default as arrowDown } from '/svg/Polygon 2.svg'
import QQ from '/svg/Слой 6.svg'

interface Props {
	years: number[]
}

function Indicators({ years }: Props) {
	const theme = useTheme()
	const [year, setYear] = useState(currentYear)

	const { data: indicators = [] } = useGetInvestmentIndicators(year)

	return (
		<>
			<Box className='flex justify-between items-center'>
				<div>
					<ThemeText variant='h4' text='Показатели по районам' />
					<Typography variant='h6' color='gray'>
						с начало года
					</Typography>
				</div>
				<YearSelect onChange={setYear} value={year} years={years} />
			</Box>
			<Box
				className='mt-5 shadow-2xl w-full rounded-2xl p-2.5 grid grid-cols-2'
				sx={{
					bgcolor: 'background.paper',
					border: `1px solid ${theme.palette.divider}`,
				}}
			>
				<Box className='flex items-center justify-center'>
					<img src={QQ} alt='' className='h-[300px] w-[300px] m-auto' />
				</Box>

				<Box className='flex flex-col  justify-between gap-2'>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow
									sx={{
										display: 'grid',
										gridTemplateColumns: '2fr 1fr',
										fontWeight: 'bold',
									}}
								>
									<TableCell>
										<strong>Регионы</strong>
									</TableCell>
									<TableCell>
										<strong>Объём</strong>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{indicators.map((item, index) => (
									<TableRow
										key={index}
										sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}
									>
										<TableCell>{item.region_name}</TableCell>
										<TableCell
											sx={{
												display: 'grid',
												gridGap: '5px',
												gridTemplateColumns: '1fr 1fr 1fr',
											}}
										>
											<span className='3xl'>{item.value} T</span>
											<img
												src={item.percent.status === 'up' ? arrowUp : arrowDown}
												alt={item.percent.status}
											/>
											<span className='3xl'>{item.percent.value}%</span>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<IndicatorsModal indicators={indicators} />
				</Box>
			</Box>
		</>
	)
}

export default Indicators
