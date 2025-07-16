import ErrorPage from '..'

const ErrorFallbackPage = () => {
	return <ErrorPage code={500} titleId='message.offline.title' descriptionId='message.offline.description' />
}

export default ErrorFallbackPage
