import { useTheme } from '@mui/material'
import { FunctionComponent } from 'react'

export const CustomizedLabel: FunctionComponent<any> = (props: any) => {
	const { x, y, value } = props
	const theme = useTheme()
	const color = theme.palette.text.primary

	return (
		<text x={x} y={y} dy={-4} fill={color} fontSize={14} textAnchor='middle'>
			{value}
		</text>
	)
}

export const CustomizedAxisTick: FunctionComponent<any> = (props: any) => {
	const { x, y, payload } = props

	return (
		<g transform={`translate(${x},${y})`}>
			<text
				x={0}
				y={0}
				dy={12}
				textAnchor='middle'
				fill='#666'
				className='text-[15px]'
			>
				{payload.value}
			</text>
		</g>
	)
}
