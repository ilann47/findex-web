export const getNameInitials = (name: string, surname: string) => {
	const stNameInitial = name.charAt(0)
	const lastNameInitial = surname.split(' ').pop()?.charAt(0)

	const initials = (stNameInitial ?? '') + (lastNameInitial ?? '')

	return initials.toUpperCase()
}
