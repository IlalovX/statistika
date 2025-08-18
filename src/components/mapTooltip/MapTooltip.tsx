import { Box, Popper, Typography } from '@mui/material'

function MapTooltip({
	anchorEl,
}: {
	anchorEl: SVGPathElement | null
	mousePos: { top: number; left: number }
}) {
	return (
		<Popper open={Boolean(anchorEl)} placement='top'>
			<Box sx={{ bgcolor: 'black', color: 'white', p: 1, borderRadius: 1 }}>
				<Typography>Это path</Typography>
			</Box>
		</Popper>
	)
}

export default MapTooltip
