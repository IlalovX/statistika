export type HomeMapPopulation = {
	Code: string
	Klassifikator: string
	Klassifikator_en: string
	Klassifikator_ru: string
	Klassifikator_uzc: string
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
