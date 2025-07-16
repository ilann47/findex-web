import { useCallback, useRef } from 'react'

import { FormControl, FormHelperText, Stack } from '@mui/material'
import { LatLngLiteral } from 'leaflet'
import { Control, Path, useController } from 'react-hook-form'

import MarkableMarker from './markable-marker'
import { Button } from '../button'
import { Map } from '@/components/ui/map'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { theme } from '@/theme'
import { Message } from '@/types/i18n'

interface ControlledLocationInputProps<T extends object> {
	control: Control<T>
	latlng: { lat: Path<T>; lng: Path<T> }
}

const ControlledMapInput = <T extends object>({ control, latlng: { lat, lng } }: ControlledLocationInputProps<T>) => {
	const buttonRef = useRef<HTMLDivElement>(null)

	const formatMessage = useFormatMessage()
	const {
		field: latField,
		fieldState: { error: latError },
	} = useController({
		control,
		name: lat,
	})

	const {
		field: lngField,
		fieldState: { error: lngError },
	} = useController({
		control,
		name: lng,
	})

	const handleChange = useCallback(
		(latlng: LatLngLiteral) => {
			latField.onChange(latlng.lat)
			lngField.onChange(latlng.lng)
		},
		[latField, lngField]
	)

	const handleClear = useCallback(() => {
		latField.onChange(null)
		lngField.onChange(null)
	}, [latField, lngField])

	const error = lngError || latError

	return (
		<FormControl error>
			<Stack sx={{ ...(error && { border: `1px solid ${theme.palette.juicy.error[50]}` }) }}>
				<Map zoom={14}>
					<MarkableMarker
						lat={latField.value}
						lng={lngField.value}
						onChange={handleChange}
						buttonRef={buttonRef}
					/>

					<Stack position='absolute' top={16} right={16} zIndex={1000} ref={buttonRef}>
						<Button
							disabled={!latField.value || !lngField.value}
							label='form.clear-selection'
							variant='contained'
							onClick={handleClear}
						/>
					</Stack>
				</Map>

				<input {...latField} value={latField.value || ''} type='number' style={{ visibility: 'hidden' }} />
				<input {...lngField} value={latField.value || ''} type='number' style={{ visibility: 'hidden' }} />
			</Stack>
			<FormHelperText>{error && formatMessage(error.message as Message)}</FormHelperText>
		</FormControl>
	)
}

export default ControlledMapInput
