import { RoutesEnums } from '../enums/routes'

export const RoutesConsts = Object.fromEntries(
	Object.values(RoutesEnums).map(route => [route, route])
) as Record<RoutesEnums, string>
