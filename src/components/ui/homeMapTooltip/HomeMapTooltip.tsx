import { Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

function CustomTooltipContent({ data }: { data: string }) {
	let popualtion = useQuery({
		queryKey: ['population', data],
		queryFn: async () => {
			const response = await axios.get('../../../public/data.json')
			return response.data
		},
	})
	return (
		<>
			<span className='text-xs text-gray-400'>2024 г</span>
			<p className='text-xs'>Нукус</p>
			<Typography variant='h6' className='text-blue-400 text-[16px]'>
				329 тыс
			</Typography>
		</>
	)
}
export default CustomTooltipContent
