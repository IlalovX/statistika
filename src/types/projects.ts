export interface Project {
	id: number
	region_id: number
	initiator: string
	name: string
	budget_million: number
	jobs_created: number
	completion_date: string
	authority_id: number
	status_id: number
	general_status: string
}
export interface Region {
	id: number
	name: string
}

export interface Authority {
	id: number
	name: string
}

export interface Status {
	id: number
	name: string
}

export interface Data {
	Regions: Region[]
	Authorities: Authority[]
	Statuses: Status[]
	Projects: Project[]
}
