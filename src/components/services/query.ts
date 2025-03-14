import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
export function getDataPopulation() {
	return useQuery({
		queryKey: ['population'],
		queryFn: async () => {
			const response = await axios.get(
				'https://api.siat.stat.uz/media/uploads/sdmx/sdmx_data_1313.json'
			)
			return response.data
		},
	})
}
