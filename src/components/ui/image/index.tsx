import { useEffect, useState } from 'react'

import { Skeleton } from '@mui/material'

import { InfoWarning } from '../feedback/warning/info'

interface Props {
	file: File | null
	isLoading?: boolean
}

const Image = ({ file, isLoading = false }: Props) => {
	const [fileUrl, setFileUrl] = useState<string | null>(null)

	useEffect(() => {
		if (file) {
			setFileUrl(URL.createObjectURL(file))

			return () => {
				if (fileUrl) {
					URL.revokeObjectURL(fileUrl)
				}
			}
		}
	}, [file])

	if (isLoading) {
		return <Skeleton variant='rectangular' width='100%' height='100%' />
	}

	if (!fileUrl) return <InfoWarning descriptionId='instrument.image.not-found' height='100%' />

	return (
		<img
			src={fileUrl}
			onLoad={() => {
				URL.revokeObjectURL(fileUrl)
			}}
			style={{ objectFit: 'cover' }}
			height='100%'
			width='100%'
		/>
	)
}

export default Image
