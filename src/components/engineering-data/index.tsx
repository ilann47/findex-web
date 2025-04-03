/* eslint-disable indent */
import { BarometerEngineeringData } from './barometer'
import { DirectPendulumEngineeringData } from './direct-pendulum'
import { ElectricJointMeterEngineeringData } from './electric-joint-meter'
import { ExtensometerEngineeringData } from './extensometer'
import { FlowMeterEngineeringData } from './flow-meter'
import { GeonorPiezometerEngineeringData } from './geonor-piezometer'
import { InvertedPendulumEngineeringData } from './inverted-pendulum'
import { StandpipePiezometerEngineeringData } from './standpipe-piezometer'
import { DeformimeterEngineeringData } from './strain-meter'
import { ConcreteTensometerEngineeringData } from './stress-meter'
import {
	BarometerEngineeringData as BarometerEngineeringDataType,
	ConcreteTensometerEngineeringData as ConcreteTensometerEngineeringDataType,
	DeformimeterEngineeringData as DeformimeterEngineeringDataType,
	DirectPendulumEngineeringData as DirectPendulumEngineeringDataType,
	ElectricJointMeterEngineeringData as ElectricJointMeterEngineeringDataType,
	ExtensometerEngineeringData as ExtensometerEngineeringDataType,
	FlowMeterEngineeringData as FlowMeterEngineeringDataType,
	GeonorPiezometerEngineeringData as GeonorPiezometerEngineeringDataType,
	InvertedPendulumEngineeringData as InvertedPendulumEngineeringDataType,
	StandpipePiezometerEngineeringData as StandpipePiezometerEngineeringDataType,
} from '@/schemas/engineering-data'
import { InstrumentType } from '@/schemas/instrument'

interface Props {
	engineeringData: unknown
	instrumentType: InstrumentType
}

export const EngineeringData = ({ instrumentType, engineeringData }: Props) => {
	switch (instrumentType) {
		case 'BAROMETER': {
			return <BarometerEngineeringData engineeringData={engineeringData as BarometerEngineeringDataType} />
		}
		case 'STRESS_METER': {
			return (
				<ConcreteTensometerEngineeringData
					engineeringData={engineeringData as ConcreteTensometerEngineeringDataType}
				/>
			)
		}
		case 'STRAIN_METER': {
			return <DeformimeterEngineeringData engineeringData={engineeringData as DeformimeterEngineeringDataType} />
		}
		case 'DIRECT_PENDULUM': {
			return (
				<DirectPendulumEngineeringData engineeringData={engineeringData as DirectPendulumEngineeringDataType} />
			)
		}
		case 'ELECTRIC_JOINT_METER': {
			return (
				<ElectricJointMeterEngineeringData
					engineeringData={engineeringData as ElectricJointMeterEngineeringDataType}
				/>
			)
		}
		case 'EXTENSOMETER': {
			return <ExtensometerEngineeringData engineeringData={engineeringData as ExtensometerEngineeringDataType} />
		}
		case 'FLOW_METER': {
			return <FlowMeterEngineeringData engineeringData={engineeringData as FlowMeterEngineeringDataType} />
		}
		case 'GEONOR_PIEZOMETER': {
			return (
				<GeonorPiezometerEngineeringData
					engineeringData={engineeringData as GeonorPiezometerEngineeringDataType}
				/>
			)
		}
		case 'INVERTED_PENDULUM': {
			return (
				<InvertedPendulumEngineeringData
					engineeringData={engineeringData as InvertedPendulumEngineeringDataType}
				/>
			)
		}
		case 'STANDPIPE_PIEZOMETER': {
			return (
				<StandpipePiezometerEngineeringData
					engineeringData={engineeringData as StandpipePiezometerEngineeringDataType}
				/>
			)
		}
	}
}
