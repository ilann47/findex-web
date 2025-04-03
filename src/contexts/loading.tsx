import { createContext, useContext } from 'react'

export const LoadingContext = createContext<boolean>(false)

export const useLoading = () => {
	return useContext(LoadingContext)
}
