import { useTheme } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Pagination from '@mui/material/Pagination'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'
import ThemeText from '../../ThemeText'

function RegionTable() {
	const [page, setPage] = useState(0)
	const pageSize = 10

	const rows = useMemo(
		() => [
			{ id: 1, region: 'Шымбай', quantity: 50, percent: '38.2%' },
			{ id: 2, region: 'Кунград', quantity: 10, percent: '32.2%' },
			{ id: 3, region: 'Нукус', quantity: 80, percent: '65.1%' },
			{ id: 4, region: 'Тахтакопир', quantity: 58, percent: '20.3%' },
			{ id: 5, region: 'Амударья', quantity: 20, percent: '24.1%' },
			{ id: 6, region: 'Муйнак', quantity: 36, percent: '45.3%' },
			{ id: 7, region: 'Шоманай', quantity: 59, percent: '75.4%' },
		],
		[]
	)

	const columns = useMemo<GridColDef[]>(
		() => [
			{ field: 'region', headerName: 'Районы', flex: 2 },
			{ field: 'quantity', headerName: 'Количество', flex: 2 },
			{ field: 'percent', headerName: 'Процент', flex: 2 },
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

function SanaatQQModal() {
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
						<ThemeText variant='h4' text='Проекты 0' />
						<RegionTable />
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}

export default SanaatQQModal
