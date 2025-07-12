import { useQuery } from '@tanstack/react-query'
import { AgricultureService } from '../services/agriculture.service'
import {
	AgricultureDistrictGeneral,
	AgricultureFields,
	AgricultureFirms,
	AgricultureGraph,
	AgricultureMarket,
	AgriculturePlacement,
	AgricultureSummary,
	AgricultureTradeSummary,
	AgricultureWaterLimit,
	KlassifikatorData,
	StatProductResponse,
} from '../types/agriculture.interface'
import { ValueWithPercent } from '../types/investment.interface'

export function useAgricultureLastUpdate() {
	return useQuery({
		queryKey: ['agriculture_last_update'],
		queryFn: AgricultureService.getLastUpdate,
		select: (data: string) => data.split(' ')[0],
	})
}

export function useYieldGraph(year: number) {
	return useQuery<AgricultureGraph[]>({
		queryKey: ['agriculture_yield_graph', year],
		queryFn: () => AgricultureService.getYieldGraph(year),
		enabled: !!year,
	})
}

export function useSummary(year: number) {
	return useQuery<AgricultureSummary>({
		queryKey: ['agriculture_summary', year],
		queryFn: () => AgricultureService.getSummary(year),
		enabled: !!year,
	})
}

export function useFields(year: number) {
	return useQuery<AgricultureFields>({
		queryKey: ['agriculture_fields', year],
		queryFn: () => AgricultureService.getFields(year),
		enabled: !!year,
	})
}

export function usePlacementArea(year: number) {
	return useQuery<ValueWithPercent>({
		queryKey: ['agriculture_placement_area', year],
		queryFn: () => AgricultureService.getPlacementArea(year),
		enabled: !!year,
	})
}

export function usePlacementPlanted(year: number) {
	return useQuery<ValueWithPercent>({
		queryKey: ['agriculture_placement_planted', year],
		queryFn: () => AgricultureService.getPlacementPlanted(year),
		enabled: !!year,
	})
}

export function usePlacementHarvested(year: number) {
	return useQuery<ValueWithPercent>({
		queryKey: ['agriculture_placement_harvested', year],
		queryFn: () => AgricultureService.getPlacementHarvested(year),
		enabled: !!year,
	})
}

export function useMarket(year: number) {
	return useQuery<AgricultureMarket[]>({
		queryKey: ['agriculture_market', year],
		queryFn: () => AgricultureService.getMarket(year),
		enabled: !!year,
	})
}

export function useDistrictGeneral(year: number) {
	return useQuery<AgricultureDistrictGeneral[]>({
		queryKey: ['agriculture_district_general', year],
		queryFn: () => AgricultureService.getDistrictGeneral(year),
		enabled: !!year,
	})
}

export function useTradeSummary(year: number, type: string) {
	return useQuery<AgricultureTradeSummary[]>({
		queryKey: ['agriculture_trade_summary', year, type],
		queryFn: () => AgricultureService.getTradeSummary(year, type),
		enabled: !!year && !!type,
	})
}

export function useTradeModal(year: number, type: string) {
	return useQuery({
		queryKey: ['agriculture_trade_modal', year, type],
		queryFn: () => AgricultureService.getTradeModal(year, type),
		enabled: !!year && !!type,
	})
}

export function useDistrictByRegion(year: number, region_id: number) {
	return useQuery({
		queryKey: ['agriculture_district_by_region', year, region_id],
		queryFn: () => AgricultureService.getDistrictByRegion(year, region_id),
		enabled: !!year && !!region_id,
	})
}

export function useClientPlacement(year: number) {
	return useQuery<AgriculturePlacement[]>({
		queryKey: ['agriculture_client_placement', year],
		queryFn: () => AgricultureService.getPlacementClient(year),
		enabled: !!year,
	})
}

export function useClientFirms() {
	return useQuery<AgricultureFirms>({
		queryKey: ['agriculture_client_firms'],
		queryFn: () => AgricultureService.getFirms(),
	})
}
export function useClientWaterLimit(year: number) {
	return useQuery<AgricultureWaterLimit>({
		queryKey: ['agriculture_client_water'],
		queryFn: () => AgricultureService.getWaterLimit(year),
		enabled: !!year,
	})
}

export function useGetAgricultureYears() {
	return useQuery({
		queryKey: ['agriculture_years'],
		queryFn: () => AgricultureService.getYears(),
	})
}

export function useGetStatProduct() {
	return useQuery<KlassifikatorData[]>({
		queryKey: ['get_stat_products'],
		queryFn: () => AgricultureService.getStatProducts(),
		select: (data: StatProductResponse) => Object.values(data),
	})
}
