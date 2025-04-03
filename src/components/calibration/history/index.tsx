/* eslint-disable indent */
import CalibrationHistoryLoading from './loading'
import { BarometerCalibrationHistory } from '../barometer/history'
import { DirectPendulumCalibrationHistory } from '../direct-pendulum/history'
import { ElectricJointMeterCalibrationCalibrationHistory } from '../electric-joint-meter/history'
import { ExtensometerCalibrationHistory } from '../extensometer/history'
import { FlowMeterCalibrationHistory } from '../flow-meter/history'
import { GeonorPiezometerCalibrationHistory } from '../geonor-piezometer/history'
import { InvertedPendulumCalibrationHistory } from '../inverted-pendulum/history'
import { StandpipePiezometerCalibrationHistory } from '../standpipe-piezometer/history'
import { DeformimeterCalibrationHistory } from '../strain-meter/history'
import { ConcreteTensometerCalibrationHistory } from '../stress-meter/history'
import { InstrumentType } from '@/schemas/instrument'

interface Props {
	instrumentId?: number
	instrumentType?: InstrumentType
	isLoading?: boolean
}

export const CalibrationHistory = ({ instrumentId, instrumentType, isLoading }: Props) => {
	if (isLoading) return <CalibrationHistoryLoading />

	if (instrumentId)
		switch (instrumentType) {
			case 'BAROMETER': {
				return <BarometerCalibrationHistory instrumentId={instrumentId} />
			}

			case 'STRESS_METER': {
				return <ConcreteTensometerCalibrationHistory instrumentId={instrumentId} />
			}

			case 'STRAIN_METER': {
				return <DeformimeterCalibrationHistory instrumentId={instrumentId} />
			}

			case 'DIRECT_PENDULUM': {
				return <DirectPendulumCalibrationHistory instrumentId={instrumentId} />
			}

			case 'ELECTRIC_JOINT_METER': {
				return <ElectricJointMeterCalibrationCalibrationHistory instrumentId={instrumentId} />
			}

			case 'EXTENSOMETER': {
				return <ExtensometerCalibrationHistory instrumentId={instrumentId} />
			}

			case 'FLOW_METER': {
				return <FlowMeterCalibrationHistory instrumentId={instrumentId} />
			}

			case 'GEONOR_PIEZOMETER': {
				return <GeonorPiezometerCalibrationHistory instrumentId={instrumentId} />
			}

			case 'INVERTED_PENDULUM': {
				return <InvertedPendulumCalibrationHistory instrumentId={instrumentId} />
			}

			case 'STANDPIPE_PIEZOMETER': {
				return <StandpipePiezometerCalibrationHistory instrumentId={instrumentId} />
			}
		}
}
