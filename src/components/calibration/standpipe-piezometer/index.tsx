import { ReactNode } from 'react'

import { Divider } from '@mui/material'

import { StandpipePiezometerReading } from '../../reading/standpipe-piezometer'
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
import { StandpipePiezometerCalibration as StandpipePiezometerCalibrationType } from '@/schemas/calibration'

interface Props {
	calibration?: StandpipePiezometerCalibrationType
	showDate?: boolean
	isLoading?: boolean
	adornment?: ReactNode
	form?: boolean
}

export const StandpipePiezometerCalibration = ({
	calibration,
	showDate = true,
	adornment,
	isLoading = false,
	form = true,
}: Props) => {
	const updateFormRef = useModal()
	const deleteFormRef = useModal()

	const { remove } = useMutate({ endpoint: `${ENDPOINTS.CALIBRATION}/${ENDPOINTS.STANDPIPE_PIEZOMETER}` })

	return (
		<LoadingContext.Provider value={isLoading}>
			<CalibrationTitle
				calibration={calibration}
				updateFormRef={(form && updateFormRef) || undefined}
				deleteFormRef={(form && deleteFormRef) || undefined}
				instrumentType='STANDPIPE_PIEZOMETER'
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
				<Field component='grid' labelId='instrument.calibration.t0'>
					{calibration?.t0}
				</Field>
				<Field component='grid' labelId='instrument.calibration.s0'>
					{calibration?.s0}
				</Field>
				<Field component='grid' labelId='instrument.calibration.q'>
					{calibration?.q}
				</Field>
				<Field component='grid' labelId='instrument.calibration.q2'>
					{calibration?.q2}
				</Field>
				<Field component='grid' labelId='instrument.calibration.alfa'>
					{calibration?.alfa}
				</Field>
				<Field component='grid' labelId='instrument.calibration.qf'>
					{calibration?.qf}
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
						<StandpipePiezometerReading reading={calibration.prioriReading} />
					</GridContainer>
				</>
			)}

			{calibration?.posterioriReading && (
				<>
					<Divider />

					<Text message='instrument.readings.title.posteriori' variant='h3' />
					<GridContainer>
						<StandpipePiezometerReading reading={calibration.posterioriReading} />
					</GridContainer>
				</>
			)}

			{calibration && (
				<>
					<CalibrationForm
						modalRef={updateFormRef}
						type='update'
						calibrationId={calibration.id}
						instrumentType='STANDPIPE_PIEZOMETER'
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
