import { axiosWithAuth } from '../api/interceptors'

export const AgricultureService = {
	async getLastUpdate() {
		const res = await axiosWithAuth.get('/agriculture/last_update')
		return res.data.data
	},

	async getYieldGraph(year: number) {
		const res = await axiosWithAuth.get('/agriculture/yield-graph', {
			params: { year },
		})
		return res.data.data
	},

	async getTradeSummary(year: number, type: string) {
		const res = await axiosWithAuth.get('/agriculture/trade-summary', {
			params: { year, type },
		})
		return res.data.data
	},

	async getTradeModal(year: number, type: string) {
		const res = await axiosWithAuth.get('/agriculture/trade-modal', {
			params: { year, type },
		})
		return res.data.data
	},

	async getSummary(year: number) {
		const res = await axiosWithAuth.get('/agriculture/summary', {
			params: { year },
		})
		return res.data
	},

	async getFields(year: number) {
		const res = await axiosWithAuth.get('/agriculture/fields', {
			params: { year },
		})
		return res.data
	},

	async getPlacementArea(year: number) {
		const res = await axiosWithAuth.get('/agriculture/placement/area', {
			params: { year },
		})
		return res.data
	},

	async getPlacementPlanted(year: number) {
		const res = await axiosWithAuth.get('/agriculture/placement/planted', {
			params: { year },
		})
		return res.data
	},

	async getPlacementHarvested(year: number) {
		const res = await axiosWithAuth.get('/agriculture/placement/harvested', {
			params: { year },
		})
		return res.data
	},

	async getMarket(year: number) {
		const res = await axiosWithAuth.get('/agriculture/market', {
			params: { year },
		})
		return res.data.data
	},

	async getDistrictGeneral(year: number) {
		const res = await axiosWithAuth.get('/agriculture/district/general', {
			params: { year },
		})
		return res.data.data
	},

	async getDistrictByRegion(year: number, region_id: number) {
		const res = await axiosWithAuth.get('/agriculture/district/by-region', {
			params: { year, region_id },
		})
		return res.data.data
	},
	async getPlacementClient(year: number) {
		const res = await axiosWithAuth.get('/agriculture/client/placement', {
			params: { year },
		})
		return res.data.data
	},
	async getWaterLimit(year: number) {
		const res = await axiosWithAuth.get('/agriculture/client/water-limit', {
			params: { year },
		})
		return res.data
	},
	async getFirms() {
		const res = await axiosWithAuth.get('/agriculture/client/firms')
		return res.data
	},
	async getYears() {
		const res = await axiosWithAuth.get('/agriculture/years')
		return res.data.data
	},
	async getStatProducts() {
		const res = await axiosWithAuth.get('/uploads/products')
		return res.data.data
	},
}
