import { axiosWithAuth } from '../api/interceptors'

export const ProjectsStatusesService = {
	async getStatusesList() {
		const res = await axiosWithAuth.get('/projects/status/list')
		return res.data.data
	},
}
