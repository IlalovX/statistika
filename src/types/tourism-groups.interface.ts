export interface GetTourismGroupList {
	id: number
	name: string
}
export interface GetTourismSubGroupList {
	id: number
	name: string
	created_at: string
}

export interface CountryCode {
	official: string
	common: string
}

export interface GetTourismGroupData {
	id: number
	year: number
	month: number
	country_code: CountryCode
	group: string
	subgroup: string
	tourist_count: number
	created_at: string
}
