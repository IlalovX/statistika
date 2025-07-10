import { useQuery } from '@tanstack/react-query'
import { HomeService } from '../services/home.service'
import {
	EnterprisesResponse,
	HomeMapPopulation,
	PopulationAgeGenderResponse,
	SalaryResponse,
	UnemploymentResponse,
	WorkingDetailResponse,
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

export function useGetSalary() {
	return useQuery<SalaryResponse>({
		queryKey: ['get_salary'],
		queryFn: () => HomeService.getSalary(),
	})
}

export function useGetUnemployment() {
	return useQuery<UnemploymentResponse>({
		queryKey: ['get_unemployment'],
		queryFn: () => HomeService.getUnemployment(),
	})
}

export function useGetAgriculture() {
	return useQuery({
		queryKey: ['get_agriculture'],
		queryFn: () => HomeService.getAgriculture(),
	})
}

export function useGetWorkingDetail() {
	return useQuery<WorkingDetailResponse>({
		queryKey: ['get_working_detail'],
		queryFn: () => HomeService.getWorkingDetail(),
	})
}

export function useGetEnterprises() {
	return useQuery<EnterprisesResponse>({
		queryKey: ['get_enterprises'],
		queryFn: () => HomeService.getEnterprises(),
	})
}

export function useGetSmallBusiness() {
	return useQuery<EnterprisesResponse>({
		queryKey: ['get_small_business'],
		queryFn: () => HomeService.getSmallBusiness(),
	})
}

export function useGetDemographyOrder() {
	return useQuery<HomeMapPopulation[]>({
		queryKey: ['get_demography_order'],
		queryFn: () => HomeService.getDemographyOrder(),
	})
}
