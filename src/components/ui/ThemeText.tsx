import { Typography, TypographyProps, useTheme } from '@mui/material'

export default function ThemeText({
	text,
	variant,
}: {
	text: string
	variant: TypographyProps['variant']
}) {
	const theme = useTheme()

	return (
		<Typography
			variant={variant}
			sx={{
				color: theme.palette.mode === 'light' ? '#355CBF' : 'white',
				fontWeight: 'bold',
			}}
		>
			{text}
		</Typography>
	)
}
