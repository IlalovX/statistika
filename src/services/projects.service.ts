import { axiosWithAuth } from '../api/interceptors'
import { ProjectSearchParams } from '../types/projects.interface'

export const ProjectsService = {
	async getProjectsList() {
		const res = await axiosWithAuth.get('/projects/list')
		return res.data.data
	},
	async getProjectsDetail(id: string | number) {
		const res = await axiosWithAuth.get(`/projects/get/${id}`)
		return res.data.data
	},
	async getProjectsOverallStatusDetail(id: string | number) {
		const res = await axiosWithAuth.get(`/projects/overall-status/${id}`)
		return res.data.data
	},
	async getProjectsLastUpdate() {
		const res = await axiosWithAuth.get('/projects/last_update')
		return res.data.data
	},
	async getProjectsSearch(params: ProjectSearchParams) {
		const res = await axiosWithAuth.get('/projects/search', { params })
		return res.data.data
	},
	async getProjectsRegionList() {
		const res = await axiosWithAuth.get('/projects/get_region_list')
		return res.data.data
	},
	async getProjectsStatusList() {
		const res = await axiosWithAuth.get('/projects/get_status_list')
		return res.data.data
	},
	async getProjectsAmount() {
		const res = await axiosWithAuth.get('/projects/count')
		return res.data.data
	},
}
