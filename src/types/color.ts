import { CSSProperties } from 'react'

export interface FeedbackColor {
	10: CSSProperties['color']
	50: CSSProperties['color']
	100: CSSProperties['color']
}

export interface Color {
	10: CSSProperties['color']
	20: CSSProperties['color']
	30: CSSProperties['color']
	40: CSSProperties['color']
	50: CSSProperties['color']
	60: CSSProperties['color']
	70: CSSProperties['color']
	80: CSSProperties['color']
	90: CSSProperties['color']
	100: CSSProperties['color']
}

export interface JuicyPalette {
	primary: Color
	secondary: Color
	neutral: Color
	success: FeedbackColor
	error: FeedbackColor
	warning: FeedbackColor
}
