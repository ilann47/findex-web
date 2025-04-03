import { ReactNode } from 'react'

import { Divider } from '@mui/material'

import { DeformimeterReading } from '../../reading/strain-meter'
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
import { DeformimeterCalibration as DeformimeterCalibrationType } from '@/schemas/calibration'

interface Props {
	calibration?: DeformimeterCalibrationType
	showDate?: boolean
	isLoading?: boolean
	adornment?: ReactNode
	form?: boolean
}

export const DeformimeterCalibration = ({
	calibration,
	showDate = true,
	adornment,
	isLoading = false,
	form = true,
}: Props) => {
	const updateformRef = useModal()
	const deleteFormRef = useModal()

	const { remove } = useMutate({ endpoint: `${ENDPOINTS.CALIBRATION}/${ENDPOINTS.STRAIN_METER}` })

	return (
		<LoadingContext.Provider value={isLoading}>
			<CalibrationTitle
				calibration={calibration}
				updateFormRef={(form && updateformRef) || undefined}
				deleteFormRef={(form && deleteFormRef) || undefined}
				instrumentType='STRAIN_METER'
				adornment={adornment}
				isLoading={isLoading}
			/>

			<GridContainer>
				{showDate && <CalibrationDateFields calibration={calibration} />}
				<Field component='grid' labelId='instrument.calibration.r1r20'>
					{calibration?.r1r20}
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
				<Field component='grid' labelId='instrument.calibration.f'>
					{calibration?.f}
				</Field>
				<Field component='grid' labelId='instrument.calibration.b'>
					{calibration?.b}
				</Field>
			</GridContainer>

			{calibration?.prioriReading && (
				<>
					<Divider />

					<Text message='instrument.readings.title.priori' variant='h3' />
					<GridContainer>
						<DeformimeterReading reading={calibration.prioriReading} />
					</GridContainer>
				</>
			)}

			{calibration?.posterioriReading && (
				<>
					<Divider />

					<Text message='instrument.readings.title.posteriori' variant='h3' />
					<GridContainer>
						<DeformimeterReading reading={calibration.posterioriReading} />
					</GridContainer>
				</>
			)}

			{calibration && (
				<>
					<CalibrationForm
						modalRef={updateformRef}
						type='update'
						calibrationId={calibration.id}
						instrumentType='STRAIN_METER'
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
