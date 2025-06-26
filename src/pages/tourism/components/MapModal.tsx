import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import { useState } from 'react'
import { MapCountries } from '../../../types/tourism.interface'

interface Props {
	isInternal: 'inbound' | 'outbound'
	sorted: MapCountries[]
}

function MapModal({ isInternal, sorted }: Props) {
	const [dialogOpen, setDialogOpen] = useState(false)
	return (
		<>
			<Button
				variant='text'
				sx={{
					alignSelf: 'end',
					mt: 1,
					fontWeight: 'bold',
					color: 'primary.main',
				}}
				onClick={() => setDialogOpen(true)}
			>
				Показать все →
			</Button>
			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				fullWidth
				maxWidth='lg'
			>
				<DialogTitle>
					{isInternal === 'inbound'
						? 'Все прибывшие туристы'
						: 'Все уехавшие туристы'}
				</DialogTitle>
				<DialogContent dividers>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>
										<strong>Страна (код)</strong>
									</TableCell>
									<TableCell>
										<strong>Количество</strong>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{sorted.map((country, index) => (
									<TableRow key={index}>
										<TableCell>{country.country.official}</TableCell>
										<TableCell>{country[isInternal]}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default MapModal
