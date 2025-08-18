import { MONTHS } from '../const/monthsOfYear'

export function getMonthLabel(month: number): string {
	const currentMonth = new Date().getMonth() + 1 // JS month is 0-based

	if (month === currentMonth) return 'текущий месяц'
	if (month === currentMonth - 1 || (currentMonth === 1 && month === 12))
		return 'прошлый месяц'

	const found = MONTHS.find(m => m.value === month)
	return found ? found.label : ''
}
