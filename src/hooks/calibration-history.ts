import { useCallback, useMemo } from 'react'

import { useSearchParams } from './search-params'
import { Calibration } from '@/schemas/calibration'

const CALIBRATION_ID = 'calibration-id'

/**
 * Custom hook to manage calibration history menu based on URL search parameters.
 *
 * This hook extracts a `calibrationId` from the URL's search params and allows
 * setting or retrieving this ID. Additionally, if a list of `calibrations` is provided,
 * it returns the calibration object matching the `calibrationId`.
 *
 * @template T - The type of the calibration, extending the Calibration schema.
 * @param {T[]} [calibrations] - Optional array of calibration objects. If provided,
 * the hook will find and return the calibration object corresponding to the `calibrationId`.
 *
 */

export const useCalibrationHistory = <T extends Calibration>(calibrations?: T[]) => {
	const { searchParams, setParam } = useSearchParams()

	const calibrationId = Number(searchParams.get(CALIBRATION_ID))

	const selectedCalibration = useMemo(
		() => calibrations?.find((calibration) => calibration.id == Number(calibrationId)),
		[calibrationId, calibrations]
	)

	const setCalibrationId = useCallback((id: number) => {
		setParam(CALIBRATION_ID, id)
	}, [])

	return {
		calibrationId,
		selectedCalibration,
		setCalibrationId,
	}
}
