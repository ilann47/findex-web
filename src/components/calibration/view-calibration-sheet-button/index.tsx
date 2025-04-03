import { Document } from '@carbon/icons-react'
import { Stack } from '@mui/material'

import { Button } from '@/components/ui/inputs/button'
import { openModal, useModal } from '@/components/ui/modal'
import { ModalPdf } from '@/components/ui/pdf/modal'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetFile } from '@/hooks/file/get-file'
import { InstrumentType } from '@/schemas/instrument'

interface Props {
	instrumentType: InstrumentType
	calibrationId: number
}

export const ViewCalibrationSheetButton = ({ calibrationId, instrumentType }: Props) => {
	const calibrationSheetModalRef = useModal()

	const { file, isLoading } = useGetFile({
		endpoint: `${ENDPOINTS.CALIBRATION}/${ENDPOINTS[instrumentType]}/${calibrationId}/sheet`,
		filename: 'instrument.calibration.calibration-sheet',
	})

	return (
		<>
			<Stack alignItems='end'>
				<Button
					variant='text'
					label='instrument.calibration.view-calibration-sheet'
					startIcon={<Document />}
					onClick={openModal(calibrationSheetModalRef)}
					disabled={!isLoading && !file}
					isLoading={isLoading}
					sx={{ width: 'fit-content' }}
				/>
			</Stack>

			{file && <ModalPdf modalRef={calibrationSheetModalRef} file={file} />}
		</>
	)
}
