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
	useTheme,
} from '@mui/material'
import ModalRegionTable from '../ui/modalRegionTable/ModalRegionTable'
import { default as arrowUp } from '/svg/Polygon 2 (1).svg'
import { default as arrowDown } from '/svg/Polygon 2.svg'
import QQ from '/svg/Слой 5.svg'

const data = [
	{ region: 'Шымбай', amount: 355, change: 1.5, up: true },
	{ region: 'Кунград', amount: 658, change: 1.5, up: false },
	{ region: 'Нукус', amount: 298, change: 3.5, up: false },
	{ region: 'Тахтакопир', amount: 158, change: 0.5, up: true },
	{ region: 'Амударья', amount: 658, change: 1.5, up: false },
	{ region: 'Муйнак', amount: 658, change: 1.5, up: false },
]

function XojalikPlantedCard() {
	const theme = useTheme()
	return (
		<Box
			className={`mt-5 shadow-2xl w-full rounded-2xl p-2.5 mb-20 grid grid-cols-2 ${'container'}`}
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Box>
				<header className='flex gap-5 mb-10'>
					<Typography
						variant='h6'
						className='cursor-pointer'
						fontWeight='bold'
						color='blue'
					>
						Прибывшие туристы
					</Typography>
					<Typography
						variant='h6'
						className='cursor-pointer'
						fontWeight='bold'
						color='gray'
					>
						Уехавшие туристы
					</Typography>
				</header>
				<img src={QQ} alt='' className='h-[300px w-[300px] m-auto' />
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
									<TableCell>{row.region}</TableCell>
									<TableCell
										sx={{
											display: 'grid',
											gridGap: '5px',
											gridTemplateColumns: '1fr 1fr 1fr',
										}}
									>
										<span className='3xl'>{row.amount} T</span>
										{row.up ? <img src={arrowDown} /> : <img src={arrowUp} />}
										<span className='3xl '>{row.change}%</span>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<ModalRegionTable />
			</Box>
		</Box>
	)
}

export default XojalikPlantedCard
