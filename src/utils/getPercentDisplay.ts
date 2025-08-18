export function getPercentColor(status: 'up' | 'down' | 'mid') {
	switch (status) {
		case 'up':
			return '#28C76F' // зелёный
		case 'down':
			return '#EA5455' // красный
		default:
			return '#6E6B7B' // серый
	}
}

export function getPercentSign(status: 'up' | 'down' | 'mid') {
	if (status === 'up') return '+'
	if (status === 'down') return '-'
	return ''
}
