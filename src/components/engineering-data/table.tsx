/* eslint-disable indent */

import { useCallback } from 'react'

import { BarometerEngineeringDataTable } from './barometer/table'
import { DirectPendulumEngineeringDataTable } from './direct-pendulum/table'
import { ElectricJointMeterEngineeringDataTable } from './electric-joint-meter/table'
import { ExtensometerEngineeringDataTable } from './extensometer/table'
import { FlowMeterEngineeringDataTable } from './flow-meter/table'
import { GeonorPiezometerEngineeringDataTable } from './geonor-piezometer/table'
import { InvertedPendulumEngineeringDataTable } from './inverted-pendulum/table'
import { StandpipePiezometerEngineeringDataTable } from './standpipe-piezometer/table'
import { DeformimeterEngineeringDataTable } from './strain-meter/table'
import { ConcreteTensometerEngineeringDataTable } from './stress-meter/table'
import { EngineeringData } from '@/schemas/engineering-data'
import { Instrument } from '@/schemas/instrument'

interface Props {
	instrument: Instrument
}

export const EngineeringDataTable = ({ instrument }: Props) => {
	const getRowLink = useCallback((engineeringData: EngineeringData) => `engineering-values/${engineeringData.id}`, [])

	switch (instrument.type) {
		case 'BAROMETER': {
			return <BarometerEngineeringDataTable instrument={instrument} getRowLink={getRowLink} />
		}

		case 'STRESS_METER': {
			return <ConcreteTensometerEngineeringDataTable instrument={instrument} getRowLink={getRowLink} />
		}

		case 'STRAIN_METER': {
			return <DeformimeterEngineeringDataTable instrument={instrument} getRowLink={getRowLink} />
		}

		case 'DIRECT_PENDULUM': {
			return <DirectPendulumEngineeringDataTable instrument={instrument} getRowLink={getRowLink} />
		}

		case 'ELECTRIC_JOINT_METER': {
			return <ElectricJointMeterEngineeringDataTable instrument={instrument} getRowLink={getRowLink} />
		}

		case 'EXTENSOMETER': {
			return <ExtensometerEngineeringDataTable instrument={instrument} getRowLink={getRowLink} />
		}

		case 'FLOW_METER': {
			return <FlowMeterEngineeringDataTable instrument={instrument} getRowLink={getRowLink} />
		}

		case 'GEONOR_PIEZOMETER': {
			return <GeonorPiezometerEngineeringDataTable instrument={instrument} getRowLink={getRowLink} />
		}

		case 'INVERTED_PENDULUM': {
			return <InvertedPendulumEngineeringDataTable instrument={instrument} getRowLink={getRowLink} />
		}

		case 'STANDPIPE_PIEZOMETER': {
			return <StandpipePiezometerEngineeringDataTable instrument={instrument} getRowLink={getRowLink} />
		}
	}
}
