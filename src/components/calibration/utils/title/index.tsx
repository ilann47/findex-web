/* eslint-disable prettier/prettier */
import { ReactNode, RefObject } from 'react'

import { Skeleton, Stack } from '@mui/material'

import { ViewCalibrationSheetButton } from '../../view-calibration-sheet-button'
import DropdownButton from '@/components/ui/inputs/dropdown-button'
import { ModalOptions, openModal } from '@/components/ui/modal'
import { Text } from '@/components/ui/text'
import { RoleName } from '@/schemas/auth'
import { Calibration } from '@/schemas/calibration'
import { InstrumentType } from '@/schemas/instrument'
import { theme } from '@/theme'
import { Message } from '@/types/i18n'

interface Props {
	calibration?: Calibration
	updateFormRef?: RefObject<ModalOptions>
	deleteFormRef?: RefObject<ModalOptions>
	adornment?: ReactNode
	instrumentType: InstrumentType
	isLoading: boolean
}

export const CalibrationTitle = ({
	calibration,
	updateFormRef,
	deleteFormRef,
	adornment,
	instrumentType,
	isLoading,
}: Props) => {
	return (
		<Stack direction='row' alignItems='center' justifyContent='space-between'>
			<Text message='instrument.calibration.title.singular' variant='h2' />

			{calibration && !isLoading ? (
				<Stack direction='row'>
					{adornment}
					<ViewCalibrationSheetButton calibrationId={calibration.id} instrumentType={instrumentType} />

					<DropdownButton
						size='small'
						options={[
							...(updateFormRef
								? [
									{
										label: 'form.edit' as Message,
										onClick: openModal(updateFormRef),
										role: 'INSTRUMENT_CALIBRATION_UPDATE' as RoleName,
									},
								]
								: []),
							...(deleteFormRef
								? [
									{
										label: 'form.delete' as Message,
										onClick: openModal(deleteFormRef),
										role: 'INSTRUMENT_CALIBRATION_DELETE' as RoleName,
									},
								]
								: []),
						]}
					/>
				</Stack>
			) : (
				<Skeleton variant='rectangular' width={theme.spacing(48)} height={theme.spacing(5)} />
			)}
		</Stack>
	)
}
