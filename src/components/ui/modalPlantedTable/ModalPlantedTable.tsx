import { Box, Button, Fade, Modal, Pagination, useTheme } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useMemo, useState } from 'react'



interface TableRow {
	id: number
	products: string
	weigh: number
	price: number
	icon: string
}

interface ModalTableProps {
	data: Record<string, Record<number, number>>
}

const ModalTable: React.FC<ModalTableProps> = ({ data }) => {
	const [page, setPage] = useState(0)
	const pageSize = 10

	const processedData = useMemo(() => {
		return Object.entries(data).map(([key, values]) => ({
			name: key,
			area: 0, // Если есть поле, можно добавить
			planted: 0,
			yield: values[2024] || 0,
			percentage: 0, // Можно рассчитать, если есть данные
		}))
	}, [data])

	const rows: TableRow[] = useMemo(
		() =>
			processedData.map((item, index) => ({
				id: index + 1,
				products: item.name,
				weigh: item.yield,
				price: item.percentage,
				icon: '/svg/projects/Background.svg',
			})),
		[processedData]
	)

	const columns: GridColDef[] = useMemo(
		() => [
			{
				field: 'products',
				headerName: 'Продукты',
				flex: 2,
				renderCell: params => (
					<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
						<img
							src={params.row.icon}
							alt={params.value}
							width={32}
							height={32}
						/>
						{params.value}
					</div>
				),
			},
			{ field: 'weigh', headerName: 'Масса (т)', flex: 2 },
			{
				field: 'price',
				headerName: 'Цена ($)',
				flex: 1,
				renderCell: params => <div>{params.value} $</div>,
			},
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

interface ModalPlantedTableProps {
	data: Record<string, Record<number, number>>
}

const ModalPlantedTable: React.FC<ModalPlantedTableProps> = ({ data }) => {
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
						<ModalTable data={data} />
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}

export default ModalPlantedTable
