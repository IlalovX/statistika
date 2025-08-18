export interface RegionPopulation {
	id: number
	map_code: string
	name: string
	name_en: string
	name_ru: string
	name_uz: string
	name_uzc: string
	is_root: boolean
	data: YearPopulationEntry[]
}

export type YearPopulationEntry = {
	[year: number]: number
}
