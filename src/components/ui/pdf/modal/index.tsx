import { RefObject } from 'react'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

import { Download } from '@carbon/icons-react'
import { pdfjs } from 'react-pdf'

import { Pdf } from '..'
import { IconButton } from '../../inputs/icon-button'
import Modal, { ModalOptions } from '../../modal'
import { downloadFile } from '@/utils/file'

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

interface Props {
	modalRef: RefObject<ModalOptions>
	file: File
}

export const ModalPdf = ({ modalRef, file }: Props) => {
	return (
		<Modal ref={modalRef} noPadding>
			<Pdf file={file} />

			<IconButton
				onClick={() => downloadFile(file)}
				sx={{ position: 'absolute', top: (theme) => theme.spacing(2), right: (theme) => theme.spacing(2) }}
				tooltip='actions.download'
			>
				<Download size={24} color='#FFF' />
			</IconButton>
		</Modal>
	)
}
