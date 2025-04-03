import { ReactNode } from 'react'

import { Divider } from '@mui/material'

import { ElectricJointMeterReading } from '../../reading/electric-joint-meter'
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
import { ElectricJointMeterCalibration as ElectricJointMeterCalibrationType } from '@/schemas/calibration'

interface Props {
	calibration?: ElectricJointMeterCalibrationType
	showDate?: boolean
	isLoading?: boolean
	adornment?: ReactNode
	form?: boolean
}

export const ElectricJointMeterCalibration = ({
	calibration,
	showDate = true,
	adornment,
	isLoading = false,
	form = true,
}: Props) => {
	const updateFormRef = useModal()
	const deleteFormRef = useModal()

	const { remove } = useMutate({ endpoint: `${ENDPOINTS.CALIBRATION}/${ENDPOINTS.ELECTRIC_JOINT_METER}` })

	return (
		<LoadingContext.Provider value={isLoading}>
			<CalibrationTitle
				calibration={calibration}
				updateFormRef={(form && updateFormRef) || undefined}
				deleteFormRef={(form && deleteFormRef) || undefined}
				instrumentType='ELECTRIC_JOINT_METER'
				adornment={adornment}
				isLoading={isLoading}
			/>

			<GridContainer>
				{showDate && <CalibrationDateFields calibration={calibration} />}
				<Field component='grid' labelId='instrument.calibration.f'>
					{calibration?.f}
				</Field>
				<Field component='grid' labelId='instrument.calibration.r1r2r0'>
					{calibration?.r1r2r0}
				</Field>
				<Field component='grid' labelId='instrument.calibration.vecc'>
					{calibration?.vecc}
				</Field>
				<Field component='grid' labelId='instrument.calibration.vdrl'>
					{calibration?.vdrl}
				</Field>
				<Field component='grid' labelId='instrument.calibration.r5'>
					{calibration?.r5}
				</Field>
				<Field component='grid' labelId='instrument.calibration.r0'>
					{calibration?.r0}
				</Field>
				<Field component='grid' labelId='instrument.calibration.beta'>
					{calibration?.beta}
				</Field>
			</GridContainer>

			{calibration?.prioriReading && (
				<>
					<Divider />

					<Text message='instrument.readings.title.priori' variant='h3' />
					<GridContainer>
						<ElectricJointMeterReading reading={calibration?.prioriReading} />
					</GridContainer>
				</>
			)}

			{calibration?.posterioriReading && (
				<>
					<Divider />

					<Text message='instrument.readings.title.posteriori' variant='h3' />
					<GridContainer>
						<ElectricJointMeterReading reading={calibration?.posterioriReading} />
					</GridContainer>
				</>
			)}

			{calibration && (
				<>
					<CalibrationForm
						modalRef={updateFormRef}
						type='update'
						calibrationId={calibration.id}
						instrumentType='ELECTRIC_JOINT_METER'
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
