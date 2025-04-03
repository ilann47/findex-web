import { ReactNode } from 'react'

import { Divider } from '@mui/material'

import { FlowMeterReading } from '../../reading/flow-meter'
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
import { FlowMeterCalibration as FlowMeterCalibrationType } from '@/schemas/calibration'

interface Props {
	calibration?: FlowMeterCalibrationType
	showDate?: boolean
	isLoading?: boolean
	adornment?: ReactNode
	form?: boolean
}

export const FlowMeterCalibration = ({
	calibration,
	showDate = true,
	adornment,
	isLoading = false,
	form = true,
}: Props) => {
	const updateFormRef = useModal()
	const deleteFormRef = useModal()

	const { remove } = useMutate({ endpoint: `${ENDPOINTS.CALIBRATION}/${ENDPOINTS.FLOW_METER}` })

	return (
		<LoadingContext.Provider value={isLoading}>
			<CalibrationTitle
				calibration={calibration}
				updateFormRef={(form && updateFormRef) || undefined}
				deleteFormRef={(form && deleteFormRef) || undefined}
				instrumentType='FLOW_METER'
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
				<Field component='grid' labelId='instrument.calibration.k'>
					{calibration?.k}
				</Field>
				<Field component='grid' labelId='instrument.calibration.f'>
					{calibration?.f}
				</Field>
				<Field component='grid' labelId='instrument.calibration.h0'>
					{calibration?.h0}
				</Field>
				<Field component='grid' labelId='instrument.calibration.r0'>
					{calibration?.r0}
				</Field>
				<Field component='grid' labelId='instrument.calibration.t0'>
					{calibration?.t0}
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
						<FlowMeterReading reading={calibration.prioriReading} />
					</GridContainer>
				</>
			)}

			{calibration?.posterioriReading && (
				<>
					<Divider />

					<Text message='instrument.readings.title.posteriori' variant='h3' />
					<GridContainer>
						<FlowMeterReading reading={calibration.posterioriReading} />
					</GridContainer>
				</>
			)}

			{calibration && (
				<>
					<CalibrationForm
						modalRef={updateFormRef}
						type='update'
						calibrationId={calibration.id}
						instrumentType='FLOW_METER'
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
