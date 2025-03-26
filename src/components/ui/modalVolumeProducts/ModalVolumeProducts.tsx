import { useTheme } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Pagination from '@mui/material/Pagination'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'

function ModalTable() {
	const [page, setPage] = useState(0)
	const pageSize = 10

	const rows = useMemo(
		() => [
			{
				id: 1,
				region: 'Горнодобывающая промышленность и разработка карьеров',
				year2023: 5000,
				year2024: 5000,
				year2025: 5000,
			},
			{
				id: 2,
				region: 'Производственная промышленность',
				year2023: 3000,
				year2024: 3000,
				year2025: 3000,
			},
			{
				id: 3,
				region: 'Производство продуктов питания',
				year2023: 4200,
				year2024: 4200,
				year2025: 4200,
			},
			{
				id: 4,
				region: 'Производство напитков',
				year2023: 1358,
				year2024: 1358,
				year2025: 1358,
			},
			{
				id: 5,
				region: 'Производство табачной продукции',
				year2023: 9231,
				year2024: 9231,
				year2025: 9231,
			},
			{
				id: 6,
				region: 'Производство текстильной продукции',
				year2023: 531,
				year2024: 531,
				year2025: 531,
			},
			{
				id: 7,
				region: 'Производство одежды',
				year2023: 159,
				year2024: 159,
				year2025: 159,
			},
			{
				id: 8,
				region: 'Производство кожи и связанных с ней изделий',
				year2023: 4026,
				year2024: 4026,
				year2025: 4026,
			},
			{
				id: 9,
				region: 'Производство одежды',
				year2023: 2564,
				year2024: 2564,
				year2025: 2564,
			},
		],
		[]
	)

	const columns = useMemo<GridColDef[]>(
		() => [
			{ field: 'region', headerName: 'Районы', flex: 3 },
			{ field: 'year2023', headerName: '2023', flex: 1 },
			{ field: 'year2024', headerName: '2024', flex: 1 },
			{ field: 'year2025', headerName: '2025', flex: 1 },
		],
		[]
	)

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

export default function ModalVolumeProducts() {
	const theme = useTheme()
	const [open, setOpen] = useState(false)

	return (
		<div>
			<Button onClick={() => setOpen(true)} sx={{ float: 'right' }}>
				Подробнее →
			</Button>
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
						<ModalTable />
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}
