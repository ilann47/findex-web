import { useState } from 'react'

import { LatLngLiteral } from 'leaflet'
import { Popup, useMapEvents } from 'react-leaflet'

import { Marker } from '@/components/ui/map/marker'

interface MarkerProps {
	lat: number | null
	lng: number | null
	onChange: (latlng: LatLngLiteral) => void
	buttonRef: React.RefObject<HTMLDivElement>
}

const MarkableMarker = ({ lat, lng, onChange, buttonRef }: MarkerProps) => {
	const [position, setPosition] = useState<LatLngLiteral>({ lat: lat ?? 0, lng: lng ?? 0 })

	useMapEvents({
		click: (e) => {
			if (buttonRef.current && buttonRef.current.contains(e.originalEvent.target as Node)) {
				return
			}

			setPosition(e.latlng)
			onChange(e.latlng)
		},
	})

	if (!(lat && lng)) return null

	return (
		<Marker position={position}>
			<Popup>
				{position.lat}, {position.lng}
			</Popup>
		</Marker>
	)
}

export default MarkableMarker
