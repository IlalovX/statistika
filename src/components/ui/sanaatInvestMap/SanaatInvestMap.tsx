import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	useTheme,
} from '@mui/material'
import './SanaatInvestMap.css'
import SanaatModalInvest from './sanaatModalInvest'
import EARTH from '/svg/Earth.svg'
import { default as arrowUp } from '/svg/Polygon 2 (1).svg'
import { default as arrowDown } from '/svg/Polygon 2.svg'

const data = [
	{ country: 'Узбекистан', amount: 0, extra: 0 },
	{ country: 'Россия', amount: 0, extra: 0 },
	{ country: 'Казахстан', amount: 0, extra: 0 },
	{ country: 'Киргизстан', amount: 0, extra: 0 },
	{ country: 'Украина', amount: 0, extra: 0 },
]
function SanaatInvestMap() {
	const theme = useTheme()
	return (
		<Box
			className={`shadow-2xl w-full rounded-2xl p-2.5 my-5 grid grid-cols-2 `}
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Box className="flex items-center justify-center">
				<img src={EARTH} alt='' />
			</Box>

			<Box className='flex  flex-col items-end  justify-end gap-2'>
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
									<TableCell>{row.country}</TableCell>
									<TableCell
										sx={{
											display: 'grid',
											gridGap: '5px',
											gridTemplateColumns: '1fr 1fr 1fr',
										}}
									>
										<span className='3xl'>{row.amount} T</span>
										{index % 2 !== 0 ? (
											<img src={arrowDown} />
										) : (
											<img src={arrowUp} />
										)}
										<span className='3xl '>{row.extra}%</span>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<SanaatModalInvest />
			</Box>
		</Box>
	)
}

export default SanaatInvestMap
