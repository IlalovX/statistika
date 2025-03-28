import { useTheme } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Pagination from '@mui/material/Pagination'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'

interface DataProps {
	[key: string]: {
		[year: string]: number
	}
}

interface CountriesTableProps {
	data: DataProps
}

const CompaniesTable: React.FC<CountriesTableProps> = ({ data }) => {
	const [page, setPage] = useState<number>(0)
	const pageSize = 10

	const rows = useMemo(() => {
		const years = Object.keys(data.total)
		return years.map((year, index) => ({
			id: index + 1,
			year,
			total: data.total[year],
			Sanaat: data.Sanaat?.[year] || 0,
			Qurılıs: data.Qurılıs?.[year] || 0,
			Sawda: data.Sawda?.[year] || 0,
			Tasıw_hám_saqlaw: data['Tasıw hám saqlaw']?.[year] || 0,
		}))
	}, [data])

	const columns: GridColDef[] = [
		{ field: 'year', headerName: 'Jil', flex: 1 },
		{ field: 'total', headerName: 'Barshe', flex: 2 },
		{ field: 'Sanaat', headerName: 'Sanaat', flex: 2 },
		{ field: 'Qurılıs', headerName: 'Qurılıs', flex: 2 },
		{ field: 'Sawda', headerName: 'Sawda', flex: 2 },
		{ field: 'Tasıw_hám_saqlaw', headerName: 'Tasıw hám saqlaw', flex: 2 },
	]

	return (
		<div>
			<DataGrid
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

interface ModalCompaniesTableProps {
	data: DataProps
}

const ModalCompaniesTable: React.FC<ModalCompaniesTableProps> = ({ data }) => {
	const theme = useTheme()
	const [open, setOpen] = useState<boolean>(false)

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
						<CompaniesTable data={data} />
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}

export default ModalCompaniesTable
