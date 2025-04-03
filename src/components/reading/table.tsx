/* eslint-disable indent */
import { BarometerReadingsTable } from './barometer/table'
import { DirectPendulumReadingsTable } from './direct-pendulum/table'
import { ElectricJointMeterReadingsTable } from './electric-joint-meter/table'
import { ExtensometerReadingsTable } from './extensometer/table'
import { FlowMeterReadingsTable } from './flow-meter/table'
import { GeonorPiezometerReadingsTable } from './geonor-piezometer/table'
import { InvertedPendulumReadingsTable } from './inverted-pendulum/table'
import { StandpipePiezometerReadingsTable } from './standpipe-piezometer/table'
import { DeformimeterReadingsTable } from './strain-meter/table'
import { ConcreteTensometerReadingsTable } from './stress-meter/table'
import { Instrument } from '@/schemas/instrument'

interface Props {
	instrument?: Instrument
}

export const ReadingsTable = ({ instrument }: Props) => {
	switch (instrument?.type) {
		case 'BAROMETER': {
			return <BarometerReadingsTable instrument={instrument} />
		}

		case 'STRESS_METER': {
			return <ConcreteTensometerReadingsTable instrument={instrument} />
		}

		case 'STRAIN_METER': {
			return <DeformimeterReadingsTable instrument={instrument} />
		}

		case 'DIRECT_PENDULUM': {
			return <DirectPendulumReadingsTable instrument={instrument} />
		}

		case 'ELECTRIC_JOINT_METER': {
			return <ElectricJointMeterReadingsTable instrument={instrument} />
		}

		case 'EXTENSOMETER': {
			return <ExtensometerReadingsTable instrument={instrument} />
		}

		case 'FLOW_METER': {
			return <FlowMeterReadingsTable instrument={instrument} />
		}

		case 'GEONOR_PIEZOMETER': {
			return <GeonorPiezometerReadingsTable instrument={instrument} />
		}

		case 'INVERTED_PENDULUM': {
			return <InvertedPendulumReadingsTable instrument={instrument} />
		}

		case 'STANDPIPE_PIEZOMETER': {
			return <StandpipePiezometerReadingsTable instrument={instrument} />
		}
	}
}
