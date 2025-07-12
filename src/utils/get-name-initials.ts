export const getNameInitials = (name?: string) => {
	if (!name || typeof name !== 'string') {
		return '?';
	}
	
	const stNameInitial = name.charAt(0)

	const initials = (stNameInitial ?? '') 

	return initials.toUpperCase()
}
