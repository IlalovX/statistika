import { useQuery } from '@tanstack/react-query'
import { RegionsService } from '../services/regions.service'
import { Region } from '../types/region.interface'

export function useGetRegionsList() {
	return useQuery<Region[]>({
		queryKey: ['regions_list'],
		queryFn: () => {
			return RegionsService.getRegionsList()
		},
	})
}
