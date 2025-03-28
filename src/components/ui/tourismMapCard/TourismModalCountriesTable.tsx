import { Typography, useTheme } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Pagination from '@mui/material/Pagination'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'
interface CountryData {
	country: string
	count: number
}

interface CountriesTableProps {
	data: CountryData[]
}

interface TourismModalCountriesTableProps {
	data: CountryData[]
}
const CountriesTable: React.FC<CountriesTableProps> = ({ data }) => {
	const [page, setPage] = useState(0)
	const pageSize = 10
	const rows = useMemo(() => data, [])

	const columns = useMemo<GridColDef[]>(
		() => [
			{
				field: 'country',
				headerName: 'страны',
				flex: 2,
			},
			{
				field: 'count',
				headerName: 'Количество',
				flex: 2,
			},
		],
		[]
	)

	return (
		<div>
			<DataGrid
				getRowId={row => row.country}
				rows={rows.slice(page * pageSize, (page + 1) * pageSize)}
				columns={columns}
				hideFooter
				sx={{ border: 0, height: 600 }}
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
		</div>
	)
}
const TourismModalCountriesTable: React.FC<TourismModalCountriesTableProps> = ({
	data,
}) => {
	const theme = useTheme()
	const [open, setOpen] = useState(false)
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
						<CountriesTable data={data} />
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}
export default TourismModalCountriesTable
