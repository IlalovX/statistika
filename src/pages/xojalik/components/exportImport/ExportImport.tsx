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
import { useTradeSummary } from '../../../../hooks/useAgriculture'
import ExportImportModal from './ExportImportModal'
import EARTH from '/svg/Earth.svg'
import { default as arrowUp } from '/svg/Polygon 2 (1).svg'
import { default as arrowDown } from '/svg/Polygon 2.svg'

interface Props {
	years: number[]
}

function ExportImport({ years }: Props) {
	const [type, setType] = useState<'export' | 'import'>('export')
	const [year, setYear] = useState(currentYear)
	const { data: export_import = [] } = useTradeSummary(2025, type)

	const theme = useTheme()
	return (
		<>
			<header className='flex justify-between items-center'>
				<ThemeText variant='h4' text='Экспорт Импорт' />
				<YearSelect onChange={setYear} value={year} years={years} />
			</header>
			<Box
				className={`shadow-2xl w-full rounded-2xl p-2.5 my-5 grid grid-cols-2 `}
				sx={{
					bgcolor: 'background.paper',
					border: `1px solid ${theme.palette.divider}`,
				}}
			>
				<Box>
					<Box display='flex' gap={2} mb={2}>
						<Typography
							variant='h6'
							className='cursor-pointer'
							fontWeight='bold'
							color={type === 'export' ? 'blue' : 'gray'}
							onClick={() => setType('export')}
						>
							Экспорт
						</Typography>
						<Typography
							variant='h6'
							className='cursor-pointer'
							fontWeight='bold'
							color={type === 'import' ? 'blue' : 'gray'}
							onClick={() => setType('import')}
						>
							Импорт
						</Typography>
					</Box>

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
								{export_import.map((row, index) => (
									<TableRow
										key={index}
										sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}
									>
										<TableCell>{row.country_code}</TableCell>
										<TableCell
											sx={{
												display: 'grid',
												gridGap: '5px',
												gridTemplateColumns: '1fr 1fr 1fr',
											}}
										>
											<span className='3xl'>{row.value} T</span>
											{index % 2 !== 0 ? (
												<img src={arrowDown} />
											) : (
												<img src={arrowUp} />
											)}
											{/* <span className='3xl '>{row.extra}%</span> */}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<ExportImportModal data={export_import} year={year} type={type} />
				</Box>
			</Box>
		</>
	)
}

export default ExportImport
