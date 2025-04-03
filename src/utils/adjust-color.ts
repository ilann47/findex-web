// amount > 0 -> return light color
// amount < 0 -> return dark color
export const adjustColor = (hex: string, amount: number) => {
	hex = hex.replace(/^#/, '')

	let r = Number.parseInt(hex.slice(0, 2), 16)
	let g = Number.parseInt(hex.slice(2, 4), 16)
	let b = Number.parseInt(hex.slice(4, 6), 16)

	r = Math.min(255, Math.max(0, r + amount))
	g = Math.min(255, Math.max(0, g + amount))
	b = Math.min(255, Math.max(0, b + amount))

	return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
}
