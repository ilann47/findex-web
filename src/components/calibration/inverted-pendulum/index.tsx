import { ReactNode } from 'react'

import { Divider } from '@mui/material'

import { DirectPendulumReading } from '../../reading/direct-pendulum'
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
import { InvertedPendulumCalibration as InvertedPendulumCalibrationType } from '@/schemas/calibration'

interface Props {
	calibration?: InvertedPendulumCalibrationType
	showDate?: boolean
	isLoading?: boolean
	adornment?: ReactNode
	form?: boolean
}

export const InvertedPendulumCalibration = ({
	calibration,
	showDate = true,
	adornment,
	isLoading = false,
	form = true,
}: Props) => {
	const formRef = useModal()
	const deleteFormRef = useModal()

	const { remove } = useMutate({ endpoint: `${ENDPOINTS.CALIBRATION}/${ENDPOINTS.INVERTED_PENDULUM}` })

	return (
		<LoadingContext.Provider value={isLoading}>
			<CalibrationTitle
				calibration={calibration}
				updateFormRef={(form && formRef) || undefined}
				deleteFormRef={(form && deleteFormRef) || undefined}
				instrumentType='INVERTED_PENDULUM'
				adornment={adornment}
				isLoading={isLoading}
			/>

			<GridContainer>
				{showDate && <CalibrationDateFields calibration={calibration} />}
				<Field component='grid' labelId='instrument.calibration.x1'>
					{calibration?.x1}
				</Field>
				<Field component='grid' labelId='instrument.calibration.x2'>
					{calibration?.x2}
				</Field>
				<Field component='grid' labelId='instrument.calibration.y1'>
					{calibration?.y1}
				</Field>
				<Field component='grid' labelId='instrument.calibration.y2'>
					{calibration?.y2}
				</Field>
				<Field component='grid' labelId='instrument.calibration.k'>
					{calibration?.k}
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
						<DirectPendulumReading reading={calibration.prioriReading} />
					</GridContainer>
				</>
			)}

			{calibration?.posterioriReading && (
				<>
					<Divider />

					<Text message='instrument.readings.title.posteriori' variant='h3' />
					<GridContainer>
						<DirectPendulumReading reading={calibration.posterioriReading} />
					</GridContainer>
				</>
			)}

			{calibration && (
				<>
					<CalibrationForm
						modalRef={formRef}
						type='update'
						calibrationId={calibration.id}
						instrumentType='INVERTED_PENDULUM'
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
