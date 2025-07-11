export interface Klassifikator {
	Code: string
	Klassifikator: string
	Klassifikator_en: string
	Klassifikator_ru: string
	Klassifikator_uzc: string
}

export interface HomeMapPopulation extends Klassifikator {
	[year: string]: number | string
}

export interface AgeGenderStat {
	age_group: string // например: "до 18", "от 60"
	mens: number // количество мужчин
	womens: number // количество женщин
}

export type PopulationAgeGenderResponse = {
	[year: string]: AgeGenderStat[]
}

export type QuarterlyValues = {
	Q1: number
	Q2: number
	Q3: number
	Q4: number
}

export type YearlySalaryData = {
	[year: number]: QuarterlyValues
}

export interface SalaryResponse {
	klassifikators: Klassifikator
	values: YearlySalaryData
}

export type UnemploymentValues = {
	[year: number]: number
}

export interface UnemploymentResponse {
	klassifikators: Klassifikator
	values: UnemploymentValues
}

export type YearlyValues = {
	[year: number]: number
}

export interface EmploymentData {
	klassifikators: Klassifikator
	values: YearlyValues
}

export interface WorkingAgePopulationData {
	klassifikators: Klassifikator
	values: YearlyValues
}

export interface WorkingDetailResponse {
	employment: {
		data: EmploymentData
		klassifikator: string
	}
	working_age_population: {
		data: WorkingAgePopulationData
		klassifikator: string
	}
}

export interface EnterprisesResponse {
	klassifikators: Klassifikator
	active: YearlyValues
	new: YearlyValues
	total: YearlyValues
}

export type MonthlyValues = {
	[month: string]: number
}

export interface ExportImportResponse {
	klassifikators: Klassifikator
	export: {
		[year: number]: MonthlyValues
	}
	import: {
		[year: number]: MonthlyValues
	}
}
