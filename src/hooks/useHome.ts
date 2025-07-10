import { useQuery } from '@tanstack/react-query'
import { HomeService } from '../services/home.service'
import {
	HomeMapPopulation,
	PopulationAgeGenderResponse,
} from '../types/home.interface'

export function useGetPopulationOfDistricts() {
	return useQuery<HomeMapPopulation[]>({
		queryKey: ['map_population'],
		queryFn: () => HomeService.getPopulationOfDistricts(),
	})
}

export function useGetPopulationAgeGender() {
	return useQuery<PopulationAgeGenderResponse>({
		queryKey: ['get_population_age_gender'],
		queryFn: () => HomeService.getPopulationAgeGender(),
	})
}

export function useGetPoverty() {
	return useQuery<HomeMapPopulation>({
		queryKey: ['get_poverty'],
		queryFn: () => HomeService.getPoverty(),
	})
}
