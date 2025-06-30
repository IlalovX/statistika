import { CountryCode } from './tourism-groups.interface'

export interface PercentageInfo {
	value: number
	status: 'low' | 'mid' | 'high' | string
}

export interface GroupItem {
	subgroup_name: string
	value: number
	percentage: PercentageInfo
}

export interface GroupData {
	group_name: string
	group_items: GroupItem[]
}

export interface TourismOverviewItem {
	month: number | string
	tourists: number
	profit: number
}

export interface MapCountries {
	country: CountryCode
	inbound: number
	outbound: number
}
