/* eslint-disable indent */
import { BarometerCalibration } from './barometer'
import { DirectPendulumCalibration } from './direct-pendulum'
import { ElectricJointMeterCalibration } from './electric-joint-meter'
import { ExtensometerCalibration } from './extensometer'
import { FlowMeterCalibration } from './flow-meter'
import { GeonorPiezometerCalibration } from './geonor-piezometer'
import { InvertedPendulumCalibration } from './inverted-pendulum'
import { StandpipePiezometerCalibration } from './standpipe-piezometer'
import { DeformimeterCalibration } from './strain-meter'
import { ConcreteTensometerCalibration } from './stress-meter'
import {
	BarometerCalibration as BarometerCalibrationType,
	ConcreteTensometerCalibration as ConcreteTensometerCalibrationType,
	DeformimeterCalibration as DeformimeterCalibrationType,
	DirectPendulumCalibration as DirectPendulumCalibrationType,
	ElectricJointMeterCalibration as ElectricJointMeterCalibrationType,
	ExtensometerCalibration as ExtensometerCalibrationType,
	FlowMeterCalibration as FlowMeterCalibrationType,
	GeonorPiezometerCalibration as GeonorPiezometerCalibrationType,
	InvertedPendulumCalibration as InvertedPendulumCalibrationType,
	StandpipePiezometerCalibration as StandpipePiezometerCalibrationType,
} from '@/schemas/calibration'
import { InstrumentType } from '@/schemas/instrument'

interface Props {
	calibration: unknown
	instrumentType: InstrumentType
	isLoading?: boolean
	form?: boolean
}

export const Calibration = ({ instrumentType, calibration, isLoading = false, form }: Props) => {
	switch (instrumentType) {
		case 'BAROMETER': {
			return (
				<BarometerCalibration
					calibration={calibration as BarometerCalibrationType}
					form={form}
					isLoading={isLoading}
				/>
			)
		}
		case 'STRESS_METER': {
			return (
				<ConcreteTensometerCalibration
					calibration={calibration as ConcreteTensometerCalibrationType}
					form={form}
					isLoading={isLoading}
				/>
			)
		}
		case 'STRAIN_METER': {
			return (
				<DeformimeterCalibration
					calibration={calibration as DeformimeterCalibrationType}
					form={form}
					isLoading={isLoading}
				/>
			)
		}

		case 'DIRECT_PENDULUM': {
			return (
				<DirectPendulumCalibration
					calibration={calibration as DirectPendulumCalibrationType}
					form={form}
					isLoading={isLoading}
				/>
			)
		}

		case 'ELECTRIC_JOINT_METER': {
			return (
				<ElectricJointMeterCalibration
					calibration={calibration as ElectricJointMeterCalibrationType}
					form={form}
					isLoading={isLoading}
				/>
			)
		}

		case 'EXTENSOMETER': {
			return (
				<ExtensometerCalibration
					calibration={calibration as ExtensometerCalibrationType}
					form={form}
					isLoading={isLoading}
				/>
			)
		}

		case 'FLOW_METER': {
			return (
				<FlowMeterCalibration
					calibration={calibration as FlowMeterCalibrationType}
					form={form}
					isLoading={isLoading}
				/>
			)
		}

		case 'GEONOR_PIEZOMETER': {
			return (
				<GeonorPiezometerCalibration
					calibration={calibration as GeonorPiezometerCalibrationType}
					form={form}
					isLoading={isLoading}
				/>
			)
		}

		case 'INVERTED_PENDULUM': {
			return (
				<InvertedPendulumCalibration
					calibration={calibration as InvertedPendulumCalibrationType}
					form={form}
					isLoading={isLoading}
				/>
			)
		}

		case 'STANDPIPE_PIEZOMETER': {
			return (
				<StandpipePiezometerCalibration
					calibration={calibration as StandpipePiezometerCalibrationType}
					form={form}
					isLoading={isLoading}
				/>
			)
		}
	}
}
