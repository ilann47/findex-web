import RemoveButton from '../remove-button'
import { PreviewContainer } from '../style'
import { Pdf } from '@/components/ui/pdf'

interface Props {
	file: File
	removeFile: () => void
}

const PdfPreview = ({ file, removeFile }: Props) => {
	return (
		<PreviewContainer>
			<Pdf file={file} width={400} height={585} />
			<RemoveButton removeFile={removeFile} />
		</PreviewContainer>
	)
}

export default PdfPreview
