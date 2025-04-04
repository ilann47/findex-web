export const getNameInitials = (name: string) => {
	const stNameInitial = name.charAt(0)

	const initials = (stNameInitial ?? '') 

	return initials.toUpperCase()
}
