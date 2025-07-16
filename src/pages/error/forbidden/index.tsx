import ErrorPage from '..'

const ForbiddenPage = () => {
	return <ErrorPage code={403} titleId='message.forbidden.title' descriptionId='message.forbidden.description' />
}

export default ForbiddenPage
