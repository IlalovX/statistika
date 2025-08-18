import { axiosWithAuth } from '../api/interceptors'

export const TourismService = {
	async getTourismYears() {
		const res = await axiosWithAuth.get('/tourism/years')
		return res.data.data
	},
	async getTourismLastUpdate() {
		const res = await axiosWithAuth.get('/tourism/last_update')
		return res.data.data
	},
	async getToursimOverview(year: number) {
		const res = await axiosWithAuth.get('/tourism/client/overview', {
			params: { year },
		})
		return res.data.data
	},
	async getTourismCountries() {
		const res = await axiosWithAuth.get('/tourism/client/countries')
		return res.data.data
	},
	async getTourismSummary() {
		const res = await axiosWithAuth.get('/tourism/client/summary')
		return res.data
	},
	async getTourismGroupSummary(year: number, month: number) {
		const res = await axiosWithAuth.get('/tourism/client/group-summary', {
			params: { year, month },
		})
		return res.data.data
	},
}
