import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import ModalCountriesTable from '../modalCountriesTable/ModalCountriesTable'
import './MapCard.css'
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
function MapCard({
	start,
	end,

}: {
	start: string
	end: string

}) {
	return (
		<Box
			className={`shadow-2xl w-full rounded-2xl p-2.5 mb-20 grid grid-cols-2 $`}
		>
			<Box>
				<header className='flex gap-5 mb-10'>
					<Typography
						variant='h6'
						className='cursor-pointer'
						fontWeight='bold'
						color='blue'
					>
						{start}
					</Typography>
					<Typography
						variant='h6'
						className='cursor-pointer'
						fontWeight='bold'
						color='gray'
					>
						{end}
					</Typography>
				</header>
				<img src={EARTH} alt='' />
			</Box>

			<Box className='flex  flex-col items-end  justify-end gap-2'>
				<TableContainer component={Paper}>
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
				<ModalCountriesTable />
			</Box>
		</Box>
	)
}

export default MapCard
