import {
	Backdrop,
	Box,
	Button,
	Fade,
	Modal,
	Pagination,
	Typography,
	useTheme,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'

interface TourismModalCountriesTableProps {
	countries: string[]
	torists: number[]
}

const TourismModalCountriesTable: React.FC<TourismModalCountriesTableProps> = ({
	countries,
	torists,
}) => {
	const theme = useTheme()
	const [open, setOpen] = useState(false)
	const [page, setPage] = useState(0)
	const pageSize = 10

	const rows = useMemo(
		() =>
			countries.map((country, index) => ({
				id: country,
				country,
				count: torists[index] ?? 0,
			})),
		[countries, torists]
	)

	const columns: GridColDef[] = [
		{
			field: 'country',
			headerName: 'Страны',
			flex: 2,
			renderHeader: () => (
				<Typography sx={{ fontWeight: 'bold' }}>Страны</Typography>
			),
		},
		{
			field: 'count',
			headerName: 'Количество',
			flex: 2,
			renderHeader: () => (
				<Typography sx={{ fontWeight: 'bold' }}>Количество</Typography>
			),
		},
	]

	return (
		<div>
			<Button onClick={() => setOpen(true)}>Посмотреть все →</Button>
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
			>
				<Fade in={open}>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							minWidth: 1000,
							minHeight: 600,
							bgcolor:
								theme.palette.mode === 'dark'
									? theme.palette.background.default
									: theme.palette.background.paper,
							border: '2px solid #00000026',
							boxShadow: 24,
							p: 4,
							borderRadius: 2,
						}}
					>
						<Typography
							variant='h4'
							sx={{
								color: theme.palette.mode === 'light' ? '#355CBF' : 'white',
							}}
						>
							Прибывшие туристы
						</Typography>
						<DataGrid
							rows={rows.slice(page * pageSize, (page + 1) * pageSize)}
							columns={columns}
							getRowId={row => row.id}
							hideFooter
							sx={{
								border: 0,
								height: 600,
							}}
						/>
						<Pagination
							count={Math.ceil(rows.length / pageSize)}
							page={page + 1}
							onChange={(_, newPage) => setPage(newPage - 1)}
							siblingCount={1}
							boundaryCount={1}
							showFirstButton
							showLastButton
							sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
						/>
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}

export default TourismModalCountriesTable
