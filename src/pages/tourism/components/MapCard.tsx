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
import cx from 'clsx'
import { useState } from 'react'
import { useGetTourismCountries } from '../../../hooks/useTourism'
import MapModal from './MapModal'
import EARTH from '/svg/Earth.svg'

function MapCard() {
	const theme = useTheme()
	const [isInternal, setIsInternal] = useState<'inbound' | 'outbound'>(
		'inbound'
	)
	const { data: countries = [] } = useGetTourismCountries()

	const sorted = [...countries].sort((a, b) => b[isInternal] - a[isInternal])

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
						className={cx(
							isInternal === 'inbound' ? 'text-blue-500' : 'text-neutral-500'
						)}
						sx={{
							cursor: 'pointer',
							fontWeight: 'bold',
							transition: 'all 0.2s',
							userSelect: 'none',
						}}
						onClick={() => setIsInternal('inbound')}
					>
						Прибывшие туристы
					</Typography>

					<Typography
						className={cx(
							isInternal === 'outbound' ? 'text-blue-500' : 'text-neutral-500'
						)}
						sx={{
							cursor: 'pointer',
							fontWeight: 'bold',
							transition: 'all 0.2s',
							userSelect: 'none',
						}}
						onClick={() => setIsInternal('outbound')}
					>
						Уехавшие туристы
					</Typography>
				</header>
				<img src={EARTH} alt='Earth' />
			</Box>

			<Box className='flex flex-col justify-between gap-2'>
				<TableContainer>
					<Table size='small'>
						<TableHead>
							<TableRow
								sx={{
									display: 'grid',
									gridTemplateColumns: '2fr 1fr',
									fontWeight: 'bold',
								}}
							>
								<TableCell>
									<strong>Страна (код)</strong>
								</TableCell>
								<TableCell>
									<strong>Количество</strong>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{sorted.slice(0, 6).map((country, index) => (
								<TableRow
									key={index}
									sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}
								>
									<TableCell>{country.country.official}</TableCell>
									<TableCell>{country[isInternal]}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<MapModal isInternal={isInternal} sorted={sorted} />
			</Box>
		</Box>
	)
}

export default MapCard
