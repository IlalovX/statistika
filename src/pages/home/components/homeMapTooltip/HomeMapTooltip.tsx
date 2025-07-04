import { Typography } from '@mui/material'

interface Props {
	population: number | string
	year: number
	district: string
}

function CustomTooltipContent({ population, year, district }: Props) {
	return (
		<>
			<span className='text-xs text-gray-400'>{year} г</span>
			<p className='text-xl'>{district}</p>
			<Typography variant='body2' className='text-blue-400 text-[12px]'>
				{+population} тыс.
			</Typography>
		</>
	)
}
export default CustomTooltipContent
