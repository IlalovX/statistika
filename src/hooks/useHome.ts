import { useQuery } from '@tanstack/react-query'
import { HomeService } from '../services/home.service'
import { HomeMapPopulation } from '../types/home.interface'

export function useGetPopulationOfDistricts() {
	return useQuery<HomeMapPopulation[]>({
		queryKey: ['map_population'],
		queryFn: () => HomeService.getPopulationOfDistricts(),
	})
}
