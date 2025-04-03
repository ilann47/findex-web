/* eslint-disable indent */
import { BarometerReading } from './barometer'
import { DirectPendulumReading } from './direct-pendulum'
import { ElectricJointMeterReading } from './electric-joint-meter'
import { ExtensometerReading } from './extensometer'
import { FlowMeterReading } from './flow-meter'
import { GeonorPiezometerReading } from './geonor-piezometer'
import { InvertedPendulumReading } from './inverted-pendulum'
import { StandpipePiezometerReading } from './standpipe-piezometer'
import { DeformimeterReading } from './strain-meter'
import { ConcreteTensometerReading as ConcreteTensometerReadingType } from './stress-meter'
import { InstrumentType } from '@/schemas/instrument'
import {
	BarometerReading as BarometerReadingType,
	ConcreteTensometerReading,
	DeformimeterReading as DeformimeterReadingType,
	DirectPendulumReading as DirectPendulumReadingType,
	ElectricJointMeterReading as ElectricJointMeterReadingType,
	ExtensometerReading as ExtensometerReadingType,
	FlowMeterReading as FlowMeterReadingType,
	GeonorPiezometerReading as GeonorPiezometerReadingType,
	InvertedPendulumReading as InvertedPendulumReadingType,
	StandpipePiezometerReading as StandpipePiezometerReadingType,
} from '@/schemas/reading'

interface Props {
	reading: unknown
	instrumentType: InstrumentType
}

export const Reading = ({ reading, instrumentType }: Props) => {
	switch (instrumentType) {
		case 'BAROMETER': {
			return <BarometerReading reading={reading as BarometerReadingType} />
		}

		case 'STRESS_METER': {
			return <ConcreteTensometerReadingType reading={reading as ConcreteTensometerReading} />
		}

		case 'STRAIN_METER': {
			return <DeformimeterReading reading={reading as DeformimeterReadingType} />
		}

		case 'DIRECT_PENDULUM': {
			return <DirectPendulumReading reading={reading as DirectPendulumReadingType} />
		}

		case 'ELECTRIC_JOINT_METER': {
			return <ElectricJointMeterReading reading={reading as ElectricJointMeterReadingType} />
		}

		case 'EXTENSOMETER': {
			return <ExtensometerReading reading={reading as ExtensometerReadingType} />
		}

		case 'FLOW_METER': {
			return <FlowMeterReading reading={reading as FlowMeterReadingType} />
		}

		case 'GEONOR_PIEZOMETER': {
			return <GeonorPiezometerReading reading={reading as GeonorPiezometerReadingType} />
		}

		case 'INVERTED_PENDULUM': {
			return <InvertedPendulumReading reading={reading as InvertedPendulumReadingType} />
		}

		case 'STANDPIPE_PIEZOMETER': {
			return <StandpipePiezometerReading reading={reading as StandpipePiezometerReadingType} />
		}
	}
}
