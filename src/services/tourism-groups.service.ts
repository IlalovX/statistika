import { axiosWithAuth } from '../api/interceptors'

export const TourismGroupsService = {

	async getTourismGroupList() {
		const res = await axiosWithAuth.get('/tourism/group/list')
		return res.data.data
	},

	async getTourismSubGroupList(id: string | number) {
		const res = await axiosWithAuth.get(`/tourism/subgroup/${id}`)
		return res.data.data
	},

	async getTourismGroupData() {
		const res = await axiosWithAuth.get('/tourism/group/data/list')
		return res.data.data
	},
}
