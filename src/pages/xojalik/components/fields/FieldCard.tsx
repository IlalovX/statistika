import { Box, Typography, useTheme } from '@mui/material'
import { ValueWithPercent } from '../../../../types/investment.interface'

interface Props {
	name: string
	item: ValueWithPercent | undefined
}

function FieldCard({ name, item }: Props) {
	const theme = useTheme()
	const color =
		item?.percent.status === 'high'
			? '#28C76F'
			: item?.percent.status === 'low'
				? '#EA5455'
				: '#6E6B7B'

	return (
		<Box
			className='shadow-md rounded-xl p-4 space-y-2'
			sx={{
				backgroundColor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<div className='flex items-center gap-2'>
				<img
					src={'/svg/xojalik/XojalikShortInfo/Background (3).svg'}
					alt='icon'
					className='w-10 h-10'
				/>
				<Typography className='text-xl font-semibold'>
					{item?.value} га
				</Typography>
			</div>
			<div>
				<Typography className='text-gray-500'>{name}</Typography>
				<Typography className='text-green-500 text-sm mt-1' sx={{ color }}>
					{item?.percent.status === 'high'
						? '+'
						: item?.percent.status === 'low'
							? '-'
							: ''}
					{item?.percent.value}%{' '}
					<span className='text-gray-400'>за последний месяц</span>
				</Typography>
			</div>
		</Box>
	)
}

export default FieldCard
