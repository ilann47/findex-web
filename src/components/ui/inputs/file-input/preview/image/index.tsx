import RemoveButton from '../remove-button'
import { PreviewContainer } from '../style'
import Image from '@/components/ui/image'

interface Props {
	file: File
	removeFile: () => void
}

const ImagePreview = ({ file, removeFile }: Props) => {
	return (
		<PreviewContainer position='relative' maxHeight='45vh'>
			<Image file={file} />
			<RemoveButton removeFile={removeFile} />
		</PreviewContainer>
	)
}

export default ImagePreview
