export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
}

export const getAccessToken = () => {
	const accessToken = localStorage.getItem(EnumTokens.ACCESS_TOKEN)
	return accessToken || null
}

export const removeFromStorage = () => {
	localStorage.removeItem(EnumTokens.ACCESS_TOKEN)
}
