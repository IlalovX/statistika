import { Box, Typography, useTheme } from '@mui/material'
import cx from 'clsx'
import { GroupItem } from '../../../types/tourism.interface'
interface Props {
	subgroup: GroupItem
}

function SubGroups({ subgroup }: Props) {
	const theme = useTheme()

	return (
		<>
			<Box
				key={subgroup.subgroup_name}
				className='shadow-md rounded-xl p-4 space-y-2 h-40 grid grid-rows-2 grid-cols-1'
				sx={{
					backgroundColor: 'background.paper',
					border: `1px solid ${theme.palette.divider}`,
				}}
			>
				<div className='flex items-center gap-2 m-0'>
					<img
						src={'/svg/tourism/TourismDirection/Background.svg'}
						className='w-10 h-10'
					/>
					<Typography className='text-xl font-semibold'>
						{subgroup.value}
					</Typography>
				</div>
				<div className='flex flex-col justify-between h-fit'>
					<Typography>{subgroup.subgroup_name}</Typography>
					<Typography
						className={
							(cx(
								subgroup.percentage.status === 'low' && 'text-red-500',
								subgroup.percentage.status === 'high' && 'text-green-500'
							),
							'text-neutral-500 text-sm mt-1')
						}
					>
						{subgroup.percentage.status === 'low' && '-'}
						{subgroup.percentage.status === 'low' && '+'}
						{subgroup.percentage.value}
						<span className='text-gray-400'> За текущий месяц</span>
					</Typography>
				</div>
			</Box>
		</>
	)
}

export default SubGroups
