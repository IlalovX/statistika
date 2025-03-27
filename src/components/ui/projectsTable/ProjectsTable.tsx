import { Box, useTheme } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

interface Column {
	id:
		| 'city'
		| 'initiator'
		| 'projectName'
		| 'cost'
		| 'jobs'
		| 'date'
		| 'responsible'
		| 'status'
		| 'reason'
		| 'comment'
	label: string
	minWidth?: number
	align?: 'right'
}

const columns: readonly Column[] = [
	{ id: 'city', label: 'Город', minWidth: 120 },
	{ id: 'initiator', label: 'Инициатор проекта', minWidth: 200 },
	{ id: 'projectName', label: 'Название проекта', minWidth: 200 },
	{
		id: 'cost',
		label: 'Стоимость проекта (млн долл)',
		minWidth: 170,
		align: 'right',
	},
	{
		id: 'jobs',
		label: 'Созданное рабочее место',
		minWidth: 170,
		align: 'right',
	},
	{ id: 'date', label: 'Срок запуска', minWidth: 170 },
	{ id: 'responsible', label: 'Ответственный', minWidth: 200 },
	{ id: 'status', label: 'Статус', minWidth: 150 },
	{ id: 'reason', label: 'Причина', minWidth: 200 },
	{ id: 'comment', label: 'Комментарий', minWidth: 250 },
]

interface Data {
	city: string
	initiator: string
	projectName: string
	cost: number
	jobs: number
	date: string
	responsible: string
	status: string
	reason: string
	comment: string
}

function createData(
	city: string,
	initiator: string,
	projectName: string,
	cost: number,
	jobs: number,
	responsible: string,
	status: string,
	reason: string,
	comment: string
): Data {
	return {
		city,
		initiator,
		projectName,
		cost,
		jobs,
		date: '01.12.2025',
		responsible,
		status,
		reason,
		comment,
	}
}

const rows = [
	createData(
		'Нукус',
		'"Зарубежнефть" Б МЧЖ',
		'Сув таъминоти',
		7.5,
		10,
		'Андижон вилояти хокимлиги',
		'В процессе',
		'Ожидание финансирования',
		'Документы поданы'
	),
	createData(
		'Шымбай',
		'"Kogon parranda qu t-baraka" МЧЖ',
		'Паррандачилик',
		10.5,
		110,
		'Бухоро вилояти хокимлиги',
		'Завершен',
		'Все работы выполнены',
		'Официальное открытие состоялось'
	),
	createData(
		'Кунград',
		'"Kogon parranda qu t-baraka" МЧЖ',
		'Паррандачилик',
		10.5,
		110,
		'Бухоро вилояти хокимлиги',
		'В процессе',
		'Ожидание лицензии',
		'Оформление документов'
	),
	createData(
		'Амударья',
		'"Kogon parranda qu t-baraka" МЧЖ',
		'Паррандачилик',
		10.5,
		110,
		'Бухоро вилояти хокимлиги',
		'Отложен',
		'Нехватка кадров',
		'Ищем специалистов'
	),
	createData(
		'Беруни',
		'"Kogon parranda qu t-baraka" МЧЖ',
		'Паррандачилик',
		10.5,
		110,
		'Бухоро вилояти хокимлиги',
		'Отложен',
		'Финансовые трудности',
		'Пересмотр бюджета'
	),
]

const getStatusColor = (status: string) => {
	switch (status) {
		case 'Завершен':
			return 'green'
		case 'В процессе':
			return 'orange'
		case 'Отложен':
			return 'red'
		default:
			return 'gray'
	}
}

export default function CustomTable() {
	const theme = useTheme()
	return (
		<Box
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
				mt: 5,
				borderRadius: 5,
			}}
		>
			<TableContainer>
				<Table aria-label='customized table'>
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row, rowIndex) => (
							<TableRow hover role='checkbox' tabIndex={-1} key={rowIndex}>
								{columns.map(column => {
									const value = row[column.id]
									return (
										<TableCell key={column.id} align={column.align}>
											{column.id === 'status' ? (
												<Box
													sx={{
														color: getStatusColor(String(value)),
														fontWeight: 'bold',
													}}
												>
													{value}
												</Box>
											) : (
												value
											)}
										</TableCell>
									)
								})}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}
