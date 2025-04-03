import { ForwardRefRenderFunction, forwardRef, useCallback } from 'react'

import { CloudUpload } from '@carbon/icons-react'
import { Box, Stack } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { FormattedMessage } from 'react-intl'

import ImagePreview from './preview/image'
import PdfPreview from './preview/pdf'
import { FileInputContainer, IconContainer } from './style'
import { Text } from '@/components/ui/text'
import { theme } from '@/theme'

const MAX_FILE_SIZE_STRING = '10 MB'
const MAX_FILE_SIZE = 10 * 1024 * 1024

export type FileType = 'image' | 'pdf'

interface FileInputProps {
	onChange: (file: File | null) => void
	file?: File
	type: FileType
}
export interface PreviewFile extends File {
	previewUrl: string
}

const FileInput: ForwardRefRenderFunction<HTMLInputElement, FileInputProps> = ({ onChange, file, type }, ref) => {
	const { getRootProps, getInputProps, isDragActive, isFocused, fileRejections } = useDropzone({
		accept: {
			...(type == 'image' && { 'image/jpeg': [], 'image/png': [] }),
			...(type == 'pdf' && { 'application/pdf': ['.pdf'] }),
		},
		maxFiles: 1,
		maxSize: MAX_FILE_SIZE,
		onDropAccepted: (newFiles) => {
			onChange(newFiles[0])
		},
	})

	const handleRemoveFile = useCallback(() => {
		onChange(null)
	}, [])

	const openSelectFilesDialog = useCallback(() => {
		const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
		fileInput?.click()
	}, [])

	if (file && type == 'image') {
		return <ImagePreview file={file} removeFile={handleRemoveFile} />
	}

	if (file && type == 'pdf') {
		return <PdfPreview file={file} removeFile={handleRemoveFile} />
	}

	return (
		<Stack>
			<FileInputContainer
				{...getRootProps({ className: 'dropzone' })}
				$isDragging={isDragActive}
				$isFocused={isFocused}
				onClick={openSelectFilesDialog}
			>
				<input {...getInputProps()} ref={ref} />

				<IconContainer>
					<CloudUpload size={theme.spacing(3)} />
				</IconContainer>

				<Box display='inline'>
					<FormattedMessage
						id='form.drop-file'
						values={{
							b: (text) => <b style={{ textDecoration: 'underline' }}>{text}</b>,
						}}
					/>
				</Box>
			</FileInputContainer>

			{fileRejections.length > 0 && (
				<Text
					color={(theme) => theme.palette.juicy.error[50]}
					message={{
						id: 'form.too-large-file',
						values: {
							size: MAX_FILE_SIZE_STRING,
						},
					}}
				/>
			)}

			<Stack direction='row' justifyContent='space-between'>
				<Text
					color={theme.palette.juicy.neutral[70]}
					message={{
						id: 'form.supported-formats',
						values: {
							...(type == 'image' && { formats: 'JPEG, PNG' }),
							...(type == 'pdf' && { formats: 'PDF' }),
						},
					}}
				/>
				<Text
					color={theme.palette.juicy.neutral[70]}
					message={{
						id: 'form.max-size',
						values: {
							size: MAX_FILE_SIZE_STRING,
						},
					}}
				/>
			</Stack>
		</Stack>
	)
}

export default forwardRef(FileInput)
