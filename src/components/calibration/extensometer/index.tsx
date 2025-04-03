import { ReactNode } from 'react'

import { Divider } from '@mui/material'

import { ExtensometerReading } from '../../reading/extensometer'
import CalibrationForm from '../form'
import { CalibrationDateFields } from '../utils/date-fields'
import { CalibrationTitle } from '../utils/title'
import { GridContainer } from '@/components/ui/container/grid'
import { Field } from '@/components/ui/field'
import { useModal } from '@/components/ui/modal'
import { ConfirmationModal } from '@/components/ui/modal/confirmation'
import { Text } from '@/components/ui/text'
import { ENDPOINTS } from '@/constants/endpoints'
import { LoadingContext } from '@/contexts/loading'
import { useMutate } from '@/hooks/mutate'
import { ExtensometerCalibration as ExtensometerCalibrationType } from '@/schemas/calibration'

interface Props {
	calibration?: ExtensometerCalibrationType
	showDate?: boolean
	isLoading?: boolean
	adornment?: ReactNode
	form?: boolean
}

export const ExtensometerCalibration = ({
	calibration,
	showDate = true,
	adornment,
	isLoading = false,
	form = true,
}: Props) => {
	const formRef = useModal()
	const deleteFormRef = useModal()

	const { remove } = useMutate({ endpoint: `${ENDPOINTS.CALIBRATION}/${ENDPOINTS.EXTENSOMETER}` })

	return (
		<LoadingContext.Provider value={isLoading}>
			<CalibrationTitle
				calibration={calibration}
				updateFormRef={(form && formRef) || undefined}
				deleteFormRef={(form && deleteFormRef) || undefined}
				instrumentType='EXTENSOMETER'
				adornment={adornment}
				isLoading={isLoading}
			/>

			<GridContainer>
				{showDate && <CalibrationDateFields calibration={calibration} />}
				<Field component='grid' labelId='instrument.calibration.a'>
					{calibration?.a}
				</Field>
				<Field component='grid' labelId='instrument.calibration.b'>
					{calibration?.b}
				</Field>
				<Field component='grid' labelId='instrument.calibration.c'>
					{calibration?.c}
				</Field>
				<Field component='grid' labelId='instrument.calibration.g'>
					{calibration?.g}
				</Field>
				<Field component='grid' labelId='instrument.calibration.r0'>
					{calibration?.r0}
				</Field>
				<Field component='grid' labelId='instrument.calibration.t0'>
					{calibration?.t0}
				</Field>
				<Field component='grid' labelId='instrument.calibration.m'>
					{calibration?.m}
				</Field>
				<Field component='grid' labelId='instrument.calibration.bk'>
					{calibration?.bk}
				</Field>
				<Field component='grid' labelId='instrument.calibration.l'>
					{calibration?.l}
				</Field>
			</GridContainer>

			{calibration?.prioriReading && (
				<>
					<Divider />

					<Text message='instrument.readings.title.priori' variant='h3' />
					<GridContainer>
						<ExtensometerReading reading={calibration.prioriReading} />
					</GridContainer>
				</>
			)}

			{calibration?.posterioriReading && (
				<>
					<Divider />

					<Text message='instrument.readings.title.posteriori' variant='h3' />
					<GridContainer>
						<ExtensometerReading reading={calibration?.posterioriReading} />
					</GridContainer>
				</>
			)}

			{calibration && (
				<>
					{' '}
					<CalibrationForm
						modalRef={formRef}
						type='update'
						calibrationId={calibration.id}
						instrumentType='EXTENSOMETER'
					/>
					<ConfirmationModal
						modalRef={deleteFormRef}
						title='instrument.calibration.delete'
						description='instrument.calibration.delete-description'
						onConfirm={() =>
							remove({
								id: calibration.id,
								successMessage: 'instrument.calibration.form.delete.sucess-feedback',
							})
						}
					/>
				</>
			)}
		</LoadingContext.Provider>
	)
}
