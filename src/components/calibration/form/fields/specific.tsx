/* eslint-disable indent */
import BarometerCalibrationFields from './barometer'
import DirectPendulumCalibrationFields from './direct-pendulum'
import ElectricJointMeterCalibrationFields from './electric-joint-meter'
import ExtensometerCalibrationFields from './extensometer'
import FlowMeterCalibrationFields from './flow-meter'
import GeonorPiezometerCalibrationFields from './geonor-piezometer'
import InvertedPendulumCalibrationFields from './inverted-pendulum'
import StandpipePiezometerCalibrationFields from './standpipe-piezometer'
import DeformimeterCalibrationFields from './strain-meter'
import ConcreteTensometerCalibrationFields from './stress-meter'
import { InstrumentType } from '@/schemas/instrument'

interface Props {
	instrumentType: InstrumentType
}

export const SpecificCalibrationFields = ({ instrumentType }: Props) => {
	switch (instrumentType) {
		case 'BAROMETER': {
			return <BarometerCalibrationFields />
		}

		case 'STRESS_METER': {
			return <ConcreteTensometerCalibrationFields />
		}

		case 'STRAIN_METER': {
			return <DeformimeterCalibrationFields />
		}

		case 'DIRECT_PENDULUM': {
			return <DirectPendulumCalibrationFields />
		}

		case 'ELECTRIC_JOINT_METER': {
			return <ElectricJointMeterCalibrationFields />
		}

		case 'EXTENSOMETER': {
			return <ExtensometerCalibrationFields />
		}

		case 'FLOW_METER': {
			return <FlowMeterCalibrationFields />
		}

		case 'GEONOR_PIEZOMETER': {
			return <GeonorPiezometerCalibrationFields />
		}

		case 'INVERTED_PENDULUM': {
			return <InvertedPendulumCalibrationFields />
		}

		case 'STANDPIPE_PIEZOMETER': {
			return <StandpipePiezometerCalibrationFields />
		}
	}
}
