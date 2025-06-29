export interface ProjectSearchParams {
	region_id?: number | null
	project_initiator?: string | null
	budget_from?: string | null
	budget_to?: string | null
	responsible_party?: string | null
	project_status_id?: number | null
}
export interface GetProjects {
	id: number
	project_name: string
	initiator: string
	budget: number
	jobs_created: string
	planned_date: string
	last_update: Date
	responsible_party: string
	project_status: {
		value: string
		color: string
	}
	region: {
		id: number
		name: string
	}
	overall_status: string
}
