import { contentTypeToFileExtensionMap } from '@/constants/file-extensions'
import { RequestParams, Service } from '@/service'
import { saadAPI } from '@/service/saad'

export const downloadFile = (file: File) => {
	const link = document.createElement('a')
	link.href = URL.createObjectURL(file)
	link.download = file.name
	document.body.append(link)

	link.click()

	link.remove()
	URL.revokeObjectURL(link.href)
}

export const blobToFile = (blob: Blob, fileName: string) => new File([blob], fileName, { type: blob.type })

export const getFile = async (endpoint: string, filename: string, params?: RequestParams) => {
	const service = new Service(saadAPI, endpoint)

	const { data: blob, headers } = await service.getFile('blob', params)
	const contentType = headers['content-type']

	if (blob.size === 0) return null

	const extension = contentTypeToFileExtensionMap.get(contentType) || 'txt'
	return blobToFile(blob, `${filename}.${extension}`)
}

export const sanitizeFilename = (filename: string) => {
	return filename.replace('/', '-')
}
