export type StatusType = 'up' | 'down' | 'mid'

export interface Percent {
	value: number
	status: StatusType
}

export interface ValueWithPercent {
	value: number
	percent: Percent
}

export interface AgricultureGraph {
	month: number
	profit: ValueWithPercent
	yield: ValueWithPercent
}

export interface AgricultureSummary {
	yield: ValueWithPercent
	export: ValueWithPercent
	import: ValueWithPercent
	profit: ValueWithPercent
}

export interface AgricultureFields {
	free_area: string
	sown_area: string
}
export interface AgricultureTradeSummary {
	country_code: string
	value: number
}

export interface AgricultureDistrictGeneral {
	percent: Percent
	region_id: number
	region_name: string
	weight: number
}

export interface AgricultureMarket {
	export: number
	local_market: number
	month: number
}

export interface AgriculturePlacement {
	area: number
	harvested: number
	percent: Percent
	planted: number
	product: string
}

export interface AgricultureWaterLimitProduct {
	product: string
	value: number
}
export interface AgricultureWaterLimit {
	by_product: AgricultureWaterLimitProduct[]
	total: {
		percent: Percent
		value: number
	}
}

export interface AgricultureFirmsItem {
	year: number
	count: number
}

export interface AgricultureFirms {
	data: AgricultureFirmsItem[]
	total: number
}
