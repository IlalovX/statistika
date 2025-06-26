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
	region: string
	initiator: string
	project_name: string
	budget: number
	jobs_created: string
	planned_date: string // ISO формат, можно заменить на Date если будет парситься
	responsible_party: string
	project_status: string // название статуса (а не ID)
	last_update: string
	overall_status: string
}
