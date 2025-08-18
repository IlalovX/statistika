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
import { YearSelect } from '../../../../components/common/YearSelect/YearSelect'
import ThemeText from '../../../../components/ui/ThemeText'
import { currentYear } from '../../../../const/monthsOfYear'
import { useGetInvestmentProjectRegion } from '../../../../hooks/useInvestment'
import InvestmentProjectsRegionModal from './InvestmentProjectsRegionModal'
import { default as arrowUp } from '/svg/Polygon 2 (1).svg'
import { default as arrowDown } from '/svg/Polygon 2.svg'
import QQ from '/svg/Слой 6.svg'

interface Props {
	years: number[]
}

function InvestmentProjectsRegion({ years }: Props) {
	const theme = useTheme()
	const [year, setYear] = useState(currentYear)
	const { data = [] } = useGetInvestmentProjectRegion(year)

	return (
		<>
			<header className='flex justify-between items-center'>
				<div>
					<ThemeText variant='h4' text='Инвестиционные проекты по районам' />
					<Typography variant='h6' color='gray'>
						с начало года
					</Typography>
				</div>
				<YearSelect onChange={setYear} value={year} years={years} />
			</header>
			<Box
				className={`mt-5 shadow-2xl w-full rounded-2xl p-2.5  grid grid-cols-2 `}
				sx={{
					bgcolor: 'background.paper',
					border: `1px solid ${theme.palette.divider}`,
				}}
			>
				<Box className='flex items-center justify-center'>
					<img src={QQ} alt='' className='h-[300px] w-[300px] m-auto ' />
				</Box>

				<Box className='flex  flex-col  justify-between gap-2'>
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
								{data.map((row, index) => (
									<TableRow
										key={index}
										sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}
									>
										<TableCell>{row.region_name}</TableCell>
										<TableCell
											sx={{
												display: 'grid',
												gridGap: '5px',
												gridTemplateColumns: '1fr 1fr 1fr',
											}}
										>
											<span className='3xl'>{row.value} T</span>
											{row.status ? (
												<img src={arrowDown} />
											) : (
												<img src={arrowUp} />
											)}
											<span className='3xl '>{row.percent}%</span>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<InvestmentProjectsRegionModal data={data ? data : []} />
				</Box>
			</Box>
		</>
	)
}

export default InvestmentProjectsRegion
