import ErrorPage from '..'

const NotFoundPage = () => {
	return <ErrorPage code={404} titleId='message.not-found.title' descriptionId='message.not-found.description' />
}

export default NotFoundPage
