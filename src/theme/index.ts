import { buttonClasses, createTheme } from '@mui/material'

import { JUICY_PALETTE } from './colors'
import { IBMPlexSans } from './font'
import { JuicyPalette } from '@/types/color'

declare module '@mui/material/styles' {
	interface Palette {
		juicy: JuicyPalette
	}
	interface PaletteOptions {
		juicy: JuicyPalette
	}
}

export const theme = createTheme({
	palette: {
		juicy: JUICY_PALETTE,
		background: {
			default: JUICY_PALETTE.neutral[20],
		},
	},
	typography: {
		fontFamily: ['IBM Plex Sans'].join(','),
		allVariants: {
			color: JUICY_PALETTE.neutral[100],
		},
		button: {
			textTransform: 'initial',
		},
		h1: {
			fontWeight: 500,
			fontSize: 24,
			lineHeight: '32px',
		},
		h2: {
			fontWeight: 300,
			fontSize: 20,
		},
		h3: {
			fontWeight: 300,
			fontSize: 16,
		},
		h4: {
			fontWeight: 600,
			fontSize: 14,
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: Object.values(IBMPlexSans).join('\n'),
		},
		MuiTab: {
			styleOverrides: {
				root: {
					fontWeight: 300,
					color: JUICY_PALETTE.neutral[70],
					paddingRight: 40,
					'&.Mui-selected': {
						fontWeight: 500,
						color: JUICY_PALETTE.primary[60],
					},
					'&:not(.Mui-selected):hover': {
						color: JUICY_PALETTE.neutral[80],
					},
					// indicador para tabs não selecionadas em hover
					'&:hover::before': {
						content: '""',
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						height: 2,
						backgroundColor: JUICY_PALETTE.neutral[50],
					},
				},
			},
		},
		MuiTabs: {
			styleOverrides: {
				indicator: {
					background: JUICY_PALETTE.primary[60],
					height: 2,
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					borderBottomWidth: 2,
					borderColor: JUICY_PALETTE.neutral[30],
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 0,
					padding: '8px 24px',
					boxShadow: 'none',
					'&:disabled': {
						cursor: 'not-allowed',
						pointerEvents: 'all',
					},
				},
			},
			variants: [
				{
					props: { variant: 'outlined' },
					style: {
						color: JUICY_PALETTE.neutral[100],
						borderColor: JUICY_PALETTE.neutral[50],
						'&:hover': {
							background: JUICY_PALETTE.neutral[30],
							borderColor: JUICY_PALETTE.neutral[50],
						},
						'&:active': {
							backgorund: JUICY_PALETTE.neutral[40],
							borderColor: JUICY_PALETTE.neutral[50],
						},
						[`& .${buttonClasses.icon}`]: {
							color: JUICY_PALETTE.neutral[60],
						},
						'&:disabled': {
							color: JUICY_PALETTE.neutral[50],
							borderColor: JUICY_PALETTE.neutral[40],
							background: 'none',
							'& .MuiButton-icon': {
								color: JUICY_PALETTE.neutral[50],
							},
						},
					},
				},
				{
					props: { variant: 'contained' },
					style: {
						background: JUICY_PALETTE.primary[60],
						'&:hover': {
							boxShadow: 'none',
							background: JUICY_PALETTE.primary[70],
						},
						'&:active': {
							boxShadow: 'none',
							background: JUICY_PALETTE.primary[80],
						},
						'&:disabled': {
							color: JUICY_PALETTE.neutral[60],
							background: JUICY_PALETTE.neutral[50],
						},
					},
				},
				{
					props: { variant: 'text' },
					style: {
						'&:hover': { backgorund: JUICY_PALETTE.primary[10] },
						'&:active': { background: JUICY_PALETTE.primary[20] },
					},
				},
				{
					props: { size: 'large' },
					style: {
						height: '3rem',
						minWidth: '10rem',
						fontSize: '0.925rem',
					},
				},
				{
					props: { size: 'medium' },
					style: {
						fontSize: '0.9rem',
					},
				},
				{
					props: { size: 'small' },
					style: {
						height: '2rem',
					},
				},
			],
		},
		MuiToggleButton: {
			styleOverrides: {
				root: {
					display: 'flex',
					justifyContent: 'start',
					gap: '16px',
					padding: '16px 24px',
					color: JUICY_PALETTE.neutral[70],
					fontWeight: 400,
					borderRadius: 0,
					border: 'none',
					height: '56px',

					'& svg': {
						fill: JUICY_PALETTE.neutral[70],
						width: '20px',
						height: '20px',
					},

					'&.Mui-selected': {
						color: JUICY_PALETTE.primary[60],
						'& svg': {
							fill: JUICY_PALETTE.primary[60],
						},
					},
				},
			},
		},
		MuiTextField: {
			defaultProps: {
				variant: 'filled',
			},
		},
		MuiFormControl: {
			defaultProps: {
				variant: 'filled',
			},
			styleOverrides: {
				root: {
					width: '100%',
				},
			},
		},
		MuiInputBase: {
			defaultProps: {
				style: {
					borderRadius: 0,
				},
			},
		},
		MuiSwitch: {
			styleOverrides: {
				colorPrimary: {
					color: JUICY_PALETTE.neutral[10],
					'& + .MuiSwitch-track': {
						backgroundColor: JUICY_PALETTE.primary[50],
					},
					'&.Mui-checked': {
						color: JUICY_PALETTE.primary[60],
					},
					'&.Mui-checked + .MuiSwitch-track': {
						backgroundColor: JUICY_PALETTE.primary[60],
					},
				},
				root: {
					'& + .Mui-disabled': {
						cursor: 'not-allowed',
						pointerEvents: 'all',
					},
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				colorInfo: {
					color: 'white',
					'&:disabled': {
						color: JUICY_PALETTE.neutral[60],
					},
				},
			},
		},
		MuiAvatar: {
			styleOverrides: {
				root: {
					color: JUICY_PALETTE.primary[60],
					background: JUICY_PALETTE.primary[10],
				},
			},
		},
	},
})
