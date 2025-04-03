/* eslint-disable indent */
import { BarometerFormula } from '../barometer/formula'
import { DirectPendulumFormula } from '../direct-pendulum/formula'
import { ElectricJointMeterFormula } from '../electric-joint-meter/formula'
import { ExtensometerFormula } from '../extensometer/formula'
import { FlowMeterFormula } from '../flow-meter/formula'
import { GeonorPiezometerFormula } from '../geonor-piezometer/formula'
import { InvertedPendulumFormula } from '../inverted-pendulum/formula'
import { StandpipePiezometerFormula } from '../standpipe-piezometer/formula'
import { DeformimeterFormula } from '../strain-meter/formula'
import { ConcreteTensometerFormula } from '../stress-meter/formula'
import { InstrumentType } from '@/schemas/instrument'

interface Props {
	instrumentType: InstrumentType
}

export const Formula = ({ instrumentType }: Props) => {
	switch (instrumentType) {
		case 'BAROMETER': {
			return <BarometerFormula />
		}

		case 'STRESS_METER': {
			return <ConcreteTensometerFormula />
		}

		case 'STRAIN_METER': {
			return <DeformimeterFormula />
		}

		case 'DIRECT_PENDULUM': {
			return <DirectPendulumFormula />
		}

		case 'ELECTRIC_JOINT_METER': {
			return <ElectricJointMeterFormula />
		}

		case 'EXTENSOMETER': {
			return <ExtensometerFormula />
		}

		case 'FLOW_METER': {
			return <FlowMeterFormula />
		}

		case 'GEONOR_PIEZOMETER': {
			return <GeonorPiezometerFormula />
		}

		case 'INVERTED_PENDULUM': {
			return <InvertedPendulumFormula />
		}

		case 'STANDPIPE_PIEZOMETER': {
			return <StandpipePiezometerFormula />
		}
	}
}
