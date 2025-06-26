import { axiosWithAuth } from '../api/interceptors'

export const InvestmentService = {
	async getLastUpdate() {
		const res = await axiosWithAuth.get('/investment/last-update')
		return res.data.data
	},
	async getGraph(year: number) {
		const res = await axiosWithAuth.get('/investment/client/graph', {
			params: { year },
		})
		return res.data.data
	},

	async getSummary(year: number) {
		const res = await axiosWithAuth.get('/investment/client/summary', {
			params: { year },
		})
		return res.data.data
	},

	async getWorkplaces(year: number) {
		const res = await axiosWithAuth.get('/investment/client/workplaces', {
			params: { year },
		})
		return res.data.data
	},

	async getOutput(year: number) {
		const res = await axiosWithAuth.get('/investment/client/output', {
			params: { year },
		})
		return res.data.data
	},

	async getOutputDetail(year: number) {
		const res = await axiosWithAuth.get('/investment/client/output/detail', {
			params: { year },
		})
		return res.data.data
	},

	async getIndicators(year: number) {
		const res = await axiosWithAuth.get(
			'/investment/client/industry/by-region',
			{
				params: { year },
			}
		)
		return res.data.data
	},

	async getByRegion(year: number, region_id: number) {
		const res = await axiosWithAuth.get('/investment/client/by-region', {
			params: { year, region_id },
		})
		return res.data.data
	},

	async getInvestors(year: number, month: number) {
		const res = await axiosWithAuth.get('/investment/client/investors', {
			params: { year, month },
		})
		return res.data.data
	},

	async getInvestments(year: number) {
		const res = await axiosWithAuth.get('/investment/client/investments', {
			params: { year },
		})
		return res.data.data
	},

	async getInvestmentDetail(year: number) {
		const res = await axiosWithAuth.get(
			'/investment/client/investments/detail',
			{
				params: { year },
			}
		)
		return res.data.data
	},

	async getInvestmentsByRegion(year: number, month: number) {
		const res = await axiosWithAuth.get(
			'/investment/client/investments/by-region',
			{
				params: { year, month },
			}
		)
		return res.data.data
	},
	async getProjects(year: number) {
		const res = await axiosWithAuth.get(
			'/investment/client/investments/projects',
			{ params: { year } }
		)
		return res.data
	},
	async getAmountInvestments(year: number) {
		const res = await axiosWithAuth.get(
			'/investment/client/investments/amounts',
			{ params: { year } }
		)
		return res.data
	},
	async getInvestmentProjectRegion(year: number) {
		const res = await axiosWithAuth.get('/investment/client/indicators', {
			params: { year },
		})
		return res.data.data
	},
}
