import { Percent } from './agriculture.interface'
import { CountryCode } from './tourism-groups.interface'

export interface PercentWithStatus {
	value: number
	status: 'low' | 'mid' | 'high' // предполагаем, что это фиксированные строки
}

export interface ValueWithPercent {
	value: number
	percent: PercentWithStatus
}

export interface InvestmentIndustryItem {
	month: number
	product_profit?: ValueWithPercent
	product_weight: ValueWithPercent
}
export interface InvestmentIdicators {
	percent: Percent
	region_name: string
	value: number
}

export interface InvestmentProjectRegions {
	percent: number
	region_id: number
	region_name: string
	status: string
	value: number
}

export interface InvestmentOutputItem {
	amount: number
	industry_type: string
}

export interface InvestmentWorkplace {
	project_name: string
	workplaces: number
}

export interface InvestmentInvestors {
	amount: number
	country: CountryCode
}
export interface InvestmentProjectsItem {
	value: number
	percent: Percent
	project_name: string
}

export interface InvestmentProjects {
	by_project: InvestmentProjectsItem[]
	total: { value: number; percent: Percent }
}

export interface InvestmentAmountItem {
	project_name: string
	value: number
	percent: Percent
}
export interface InvestmentAmount {
	by_project: InvestmentAmountItem[]
	total: {
		value: number
		percent: Percent
	}
}
