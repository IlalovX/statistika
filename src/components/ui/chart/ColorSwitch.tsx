import { useDrawingArea, useYScale } from '@mui/x-charts/hooks'
import { ScaleLinear } from 'd3-scale'
import { ColorSwichProps } from '../../../types/propsColorSwitch'
function ColorSwich({ threshold, color1, id }: ColorSwichProps) {
	const { top, height, bottom } = useDrawingArea()
	const svgHeight = top + bottom + height
	const scale = useYScale() as ScaleLinear<number, number>
	const y0 = scale(threshold)
	const off = y0 !== undefined ? y0 / svgHeight : 0

	return (
		<defs>
			<linearGradient
				id={id}
				x1='0'
				x2='0'
				y1='0'
				y2={`${svgHeight}px`}
				gradientUnits='userSpaceOnUse'
			>
				<stop offset={off} stopColor={color1} stopOpacity={0.5} />
			</linearGradient>
		</defs>
	)
}
export default ColorSwich
