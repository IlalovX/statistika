export function formatCompactNumber(value: number): string {
	if (typeof value !== 'number') return '0'

	if (value >= 1_000_000_000) {
		return `${formatValue(value / 1_000_000_000)} млрд.`
	}
	if (value >= 1_000_000) {
		return `${formatValue(value / 1_000_000)} млн.`
	}
	if (value >= 1_000) {
		return `${formatValue(value / 1_000)} тыс.`
	}
	return value.toString()
}

function formatValue(num: number): string {
	const formatted = num.toFixed(1)
	return formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted
}
