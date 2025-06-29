import { useQuery } from '@tanstack/react-query'
import { InvestmentService } from '../services/investment.service'
import {
	InvestmentAmount,
	InvestmentIdicators,
	InvestmentIndustryItem,
	InvestmentInvestors,
	InvestmentOutputItem,
	InvestmentProjectRegions,
	InvestmentProjects,
	InvestmentWorkplace,
} from '../types/investment.interface'

export function useGetInvestmentYears() {
	return useQuery({
		queryKey: ['investment_years'],
		queryFn: () => InvestmentService.getYears(),
	})
}

export function useGetInvestmentLastUpdate() {
	return useQuery<string>({
		queryKey: ['investment_last_update'],
		queryFn: () => InvestmentService.getLastUpdate(),
		select: (data: string) => data.split(' ')[0],
	})
}

export function useGetInvestmentGraph(year: number) {
	return useQuery<InvestmentIndustryItem[]>({
		queryKey: ['investment_graph', year],
		queryFn: () => InvestmentService.getGraph(year),
		enabled: !!year,
	})
}

export function useGetInvestmentSummary(year: number) {
	return useQuery({
		queryKey: ['investment_summary', year],
		queryFn: () => InvestmentService.getSummary(year),
		enabled: !!year,
	})
}

export function useGetInvestmentWorkplaces(year: number) {
	return useQuery<InvestmentWorkplace[]>({
		queryKey: ['investment_workplaces', year],
		queryFn: () => InvestmentService.getWorkplaces(year),
		enabled: !!year,
	})
}

export function useGetInvestmentOutput(year: number) {
	return useQuery<InvestmentOutputItem[]>({
		queryKey: ['investment_output', year],
		queryFn: () => InvestmentService.getOutput(year),
		enabled: !!year,
	})
}

export function useGetInvestmentOutputDetail(year: number) {
	return useQuery({
		queryKey: ['investment_output_detail', year],
		queryFn: () => InvestmentService.getOutputDetail(year),
		enabled: !!year,
	})
}

export function useGetInvestmentIndicators(year: number) {
	return useQuery<InvestmentIdicators[]>({
		queryKey: ['investment_indicators', year],
		queryFn: () => InvestmentService.getIndicators(year),
		enabled: !!year,
	})
}

export function useGetInvestmentInvestments(year: number) {
	return useQuery({
		queryKey: ['investment_investments', year],
		queryFn: () => InvestmentService.getInvestments(year),
		enabled: !!year,
	})
}

export function useGetInvestmentDetail(year: number) {
	return useQuery({
		queryKey: ['investment_detail', year],
		queryFn: () => InvestmentService.getInvestmentDetail(year),
		enabled: !!year,
	})
}

export function useGetInvestmentByRegion(year: number, region_id: number) {
	return useQuery({
		queryKey: ['investment_client_by_region', year, region_id],
		queryFn: () => InvestmentService.getByRegion(year, region_id),
	})
}

export function useGetInvestmentInvestmentsByRegion(
	year: number,
	month: number
) {
	return useQuery({
		queryKey: ['investment_investments_by_region', year, month],
		queryFn: () => InvestmentService.getInvestmentsByRegion(year, month),
		enabled: !!year && !!month,
	})
}

export function useGetInvestmentInvestors(year: number, month: number) {
	return useQuery<InvestmentInvestors[]>({
		queryKey: ['investment_investors', year, month],
		queryFn: () => InvestmentService.getInvestors(year, month),
		enabled: !!year && !!month,
	})
}

export function useGetInvestmentProjects(year: number) {
	return useQuery<InvestmentProjects>({
		queryKey: ['investment_projects', year],
		queryFn: () => InvestmentService.getProjects(year),
		enabled: !!year,
	})
}

export function useGetInvestmentAmount(year: number) {
	return useQuery<InvestmentAmount>({
		queryKey: ['investment_amount', year],
		queryFn: () => InvestmentService.getAmountInvestments(year),
		enabled: !!year,
	})
}

export function useGetInvestmentProjectRegion(year: number) {
	return useQuery<InvestmentProjectRegions[]>({
		queryKey: ['getInvestmentProjectRegion', year],
		queryFn: () => InvestmentService.getInvestmentProjectRegion(year),
		enabled: !!year,
	})
}
