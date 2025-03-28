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

function ProjectTable() {
	const [page, setPage] = useState(0)
	const pageSize = 10
	const rows = useMemo(
		() => [
			{
				id: 1,
				company: 'IT компании',
				prof: 'Разработчик',
				amount: 0,
			},
			{
				id: 2,
				company: 'Гос учреждения',
				prof: 'Отдел кадров',
				amount: 0,
			},
			{
				id: 3,
				company: 'Банк',
				prof: 'Охранник',
				amount: 0,
			},
			{
				id: 4,
				company: 'Частные компании',
				prof: 'Бизнес аналитик',
				amount: 0,
			},
			{
				id: 5,
				company: 'Больницы',
				prof: 'Врач',
				amount: 0,
			},
			{
				id: 6,
				company: 'Клиники',
				prof: 'Медсестра',
				amount: 0,
			},
			{
				id: 7,
				company: 'Ферма',
				prof: 'Фермер',
				amount: 0,
			},
		],
		[]
	)

	const columns = useMemo<GridColDef[]>(
		() => [
			{
				field: 'company',
				headerName: 'Учреждении',
				flex: 2,
			},
			{ field: 'prof', headerName: 'Профессия', flex: 2 },
			{ field: 'amount', headerName: 'Количество', flex: 2 },
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

function ModalProjectsTable() {
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
						<ThemeText variant='h4' text='Рабочие места 0' />
						<ProjectTable />
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}
export default ModalProjectsTable
