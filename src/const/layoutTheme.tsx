import { createTheme } from '@mui/material/styles'

export const demoTheme = createTheme({
	components: {
		MuiDrawer: {
			styleOverrides: {
				paper: {
					borderRight: 'none',
				},
			},
		},
	},
	cssVariables: {
		colorSchemeSelector: 'data-toolpad-color-scheme',
	},
	colorSchemes: { light: true, dark: true },
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 600,
			lg: 1200,
			xl: 1536,
		},
	},
	palette: {
		mode: 'dark',
		background: {
			default: '#242424',
			paper: '#242424d',
		},
	},
})
