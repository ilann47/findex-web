import { Navigate, useLocation } from 'react-router-dom'

const NotFoundNavigation = () => {
	const { pathname } = useLocation()

	return <Navigate to={`/not-found?resource=${pathname}`} />
}

export default NotFoundNavigation
