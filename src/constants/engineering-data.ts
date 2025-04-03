export const INSTRUMENT_ENGINEERING_DATA = {
	BAROMETER: ['pressure'],
	STRAIN_METER: ['metersSum', 'metersRatio', 'temperature', 'tension'],
	EXTENSOMETER: ['absoluteDisplacement', 'relativeDisplacement'],
	FLOW_METER: ['waterLevel', 'waterFlow'],
	ELECTRIC_JOINT_METER: ['metersSum', 'metersRatio', 'temperature', 'displacement'],
	DIRECT_PENDULUM: ['absoluteDisplacement', 'relativeDisplacement'],
	INVERTED_PENDULUM: ['absoluteDisplacement', 'relativeDisplacement'],
	STANDPIPE_PIEZOMETER: ['absolutePressure', 'relativePressure', 'seaLevelElevation', 'tubeWaterLevelDistance'],
	GEONOR_PIEZOMETER: ['relativePressure', 'waterLevel'],
	STRESS_METER: ['metersSum', 'metersRatio', 'temperature', 'tension'],
}

// engineering values selected by default in analysis charts
export const INSTRUMENT_DEFAULT_ENGINEERING_DATA = {
	BAROMETER: ['pressure'],
	STRAIN_METER: ['tension'],
	EXTENSOMETER: ['relativeDisplacement'],
	FLOW_METER: ['waterFlow'],
	ELECTRIC_JOINT_METER: ['displacement'],
	DIRECT_PENDULUM: ['relativeDisplacement'],
	INVERTED_PENDULUM: ['relativeDisplacement'],
	STANDPIPE_PIEZOMETER: ['seaLevelElevation'],
	GEONOR_PIEZOMETER: ['waterLevel'],
	STRESS_METER: ['tension'],
}
