import { format, parse } from 'date-fns'

export const DateStringToDateObject = (date: string | null) => {
	return date ? parse(date, 'dd/MM/yyyy HH:mm:ss', new Date()) : null
}
export const DateObjectToDateString = (date: Date | null) => {
	return date ? format(date, 'dd/MM/yyyy HH:mm:ss') : ''
}

export const setTime = (date: Date | null, hrs: number, min: number, sec: number) => {
	if (date) {
		date.setHours(hrs)
		date.setMinutes(min)
		date.setSeconds(sec)
	}

	return date
}

export const formatDateToSingleValue = (date: Date | null) => {
	if (date) {
		const start = DateObjectToDateString(setTime(date, 0, 0, 0))
		const end = DateObjectToDateString(setTime(date, 23, 59, 59))

		return { start: start, end: end }
	}

	return { start: '', end: '' }
}
