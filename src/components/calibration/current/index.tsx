/* eslint-disable indent */
import { ReactNode } from 'react'

import { CurrentBarometerCalibration } from '../barometer/current'
import { CurrentDirectPendulumCalibration } from '../direct-pendulum/current'
import { CurrentElectricJointMeterCalibration } from '../electric-joint-meter/current'
import { CurrentExtensometerCalibration } from '../extensometer/current'
import { CurrentFlowMeterCalibration } from '../flow-meter/current'
import { CurrentGeonorPiezometerCalibration } from '../geonor-piezometer/current'
import { CurrentInvertedPendulumCalibration } from '../inverted-pendulum/current'
import { CurrentStandpipePiezometerCalibration } from '../standpipe-piezometer/current'
import { CurrentDeformimeterCalibration } from '../strain-meter/current'
import { CurrentConcreteTensometerCalibration } from '../stress-meter/current'
import { InstrumentType } from '@/schemas/instrument'

interface Props {
	instrumentId: number
	instrumentType: InstrumentType
	adornment?: ReactNode
}

export const CurrentCalibration = ({ instrumentId, instrumentType, adornment }: Props) => {
	switch (instrumentType) {
		case 'BAROMETER': {
			return <CurrentBarometerCalibration instrumentId={instrumentId} adornment={adornment} />
		}

		case 'STRESS_METER': {
			return <CurrentConcreteTensometerCalibration instrumentId={instrumentId} adornment={adornment} />
		}

		case 'STRAIN_METER': {
			return <CurrentDeformimeterCalibration instrumentId={instrumentId} adornment={adornment} />
		}

		case 'DIRECT_PENDULUM': {
			return <CurrentDirectPendulumCalibration instrumentId={instrumentId} adornment={adornment} />
		}

		case 'ELECTRIC_JOINT_METER': {
			return <CurrentElectricJointMeterCalibration instrumentId={instrumentId} adornment={adornment} />
		}

		case 'EXTENSOMETER': {
			return <CurrentExtensometerCalibration instrumentId={instrumentId} adornment={adornment} />
		}

		case 'FLOW_METER': {
			return <CurrentFlowMeterCalibration instrumentId={instrumentId} adornment={adornment} />
		}

		case 'GEONOR_PIEZOMETER': {
			return <CurrentGeonorPiezometerCalibration instrumentId={instrumentId} adornment={adornment} />
		}

		case 'INVERTED_PENDULUM': {
			return <CurrentInvertedPendulumCalibration instrumentId={instrumentId} adornment={adornment} />
		}

		case 'STANDPIPE_PIEZOMETER': {
			return <CurrentStandpipePiezometerCalibration instrumentId={instrumentId} adornment={adornment} />
		}
	}
}
