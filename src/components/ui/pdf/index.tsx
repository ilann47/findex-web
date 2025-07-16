import { useState } from 'react'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

import { Skeleton } from '@mui/material'
import { Document, Page, pdfjs } from 'react-pdf'

import { PdfContainer } from './styles'
import Tools from './tools'

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

interface Props {
	file: File
	width?: number
	height?: number
}

export const Pdf = ({ file, width, height }: Props) => {
	const [numPages, setNumPages] = useState<number>()
	const [pageNumber, setPageNumber] = useState(1)

	const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
		setNumPages(numPages)
	}

	return (
		<PdfContainer>
			<Document
				file={file}
				onLoadSuccess={onDocumentLoadSuccess}
				loading={<Skeleton variant='rectangular' width={width ?? '40vw'} height={height ?? '90vh'} />}
			>
				<Page pageNumber={pageNumber} width={width} height={height} />
			</Document>

			<Tools
				page={pageNumber}
				total={numPages ?? 0}
				goBack={() => setPageNumber(pageNumber - 1)}
				goNext={() => setPageNumber(pageNumber + 1)}
			/>
		</PdfContainer>
	)
}
