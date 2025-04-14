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
import ModalRegionTable from '../modalRegionTable/ModalRegionTable'
import { default as arrowUp } from '/svg/Polygon 2 (1).svg'
import { default as arrowDown } from '/svg/Polygon 2.svg'
import QQ from '/svg/Слой 6.svg'

const data = [
	{ region: 'Шымбай', amount: 0, change: 0, up: true },
	{ region: 'Кунград', amount: 0, change: 0, up: false },
	{ region: 'Нукус', amount: 0, change: 0, up: false },
	{ region: 'Тахтакопир', amount: 0, change: 0, up: true },
	{ region: 'Амударья', amount: 0, change: 0, up: false },
	{ region: 'Муйнак', amount: 0, change: 0, up: false },
]

function SanaatIndicators() {
	const theme = useTheme()
	return (
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

			<Box className='flex  flex-col items-end  justify-end gap-2'>
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
								<TableCell>Регионы</TableCell>
								<TableCell>Объём</TableCell>
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
				<ModalRegionTable text='Продукция 0т' />
			</Box>
		</Box>
	)
}

export default SanaatIndicators
