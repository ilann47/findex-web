export const INSTRUMENT_READING_VARIABLES = {
	BAROMETER: ['r'],
	STRAIN_METER: ['vr', 'vrl1', 'vp', 'vr5'],
	EXTENSOMETER: ['r1', 't1'],
	FLOW_METER: ['r1', 't1'],
	ELECTRIC_JOINT_METER: ['vr', 'vrl1', 'vp', 'vr5'],
	DIRECT_PENDULUM: ['r'],
	INVERTED_PENDULUM: ['r'],
	STANDPIPE_PIEZOMETER: ['r1', 't1'],
	GEONOR_PIEZOMETER: ['r1'],
	STRESS_METER: ['vr', 'vrl1', 'vp', 'vr5'],
}

export const ALL_INSTRUMENTS_READING_VARIABLES = [
	...new Set(Object.values(INSTRUMENT_READING_VARIABLES).flat()),
] as const
