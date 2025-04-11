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
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import TourismModalCountriesTable from './TourismModalCountriesTable'
import EARTH from '/svg/Earth.svg'
import { default as arrowUp } from '/svg/Polygon 2 (1).svg'
import { default as arrowDown } from '/svg/Polygon 2.svg'
interface TourismData {
	[year: string]: {
		[country: string]: number
	}
}
function TourismMapCard({ start, end }: { start: string; end: string }) {
	const theme = useTheme()

	const { data } = useQuery<TourismData>({
		queryKey: ['tourismcountries'],
		queryFn: async () => {
			const res = await fetch(
				'/db/tourism/mámleketler_boyınsha_turistler_sanı.json'
			)
			if (!res.ok) {
				throw new Error('Ошибка загрузки данных')
			}
			return res.json()
		},
	})
	const [countries, setCountries] = useState<string[]>([])
	const [torists, setTorists] = useState<number[]>([])

	useEffect(() => {
		if (data) {
			setCountries(Object.keys(data['2025']))
			setTorists(Object.values(data['2025']))
		}
	}, [data])

	return (
		<Box
			className='shadow-2xl w-full rounded-2xl p-2.5 my-5 grid grid-cols-2'
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

			<Box className='flex flex-col items-end justify-end gap-2'>
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
								<TableCell>Страна</TableCell>
								<TableCell>Количество</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{countries.slice(0, 4).map((row, index) => (
								<TableRow
									key={index}
									sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}
								>
									<TableCell>{row}</TableCell>
									<TableCell
										sx={{
											display: 'grid',
											gridGap: '5px',
											gridTemplateColumns: '1fr 1fr 1fr',
										}}
									>
										<span className='3xl'>{torists[index]}</span>
										{index % 2 !== 0 ? (
											<img src={arrowDown} />
										) : (
											<img src={arrowUp} />
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

				<TourismModalCountriesTable countries={countries} torists={torists} />
			</Box>
		</Box>
	)
}

export default TourismMapCard
