import { PropsWithChildren, useMemo } from 'react'

import { DivIcon, LatLngLiteral } from 'leaflet'
import { Marker as LeafletMarker } from 'react-leaflet'

import { MARKER_ICON_CLASS, MARKER_ICON_FILL_CLASS } from '@/hooks/alarm-colors'
import { AlarmType } from '@/schemas/alarm/type'

interface Props extends PropsWithChildren {
	position: [number, number] | LatLngLiteral
	alarm?: AlarmType
}

export const Marker = ({ position, alarm, children }: Props) => {
	const marker = useMemo(() => {
		return new DivIcon({
			className: `${MARKER_ICON_CLASS} ${alarm}`,
			html: `
				<div style="position: relative;">
					<!-- Shadow -->
					<svg width="27" height="40" viewBox="-1 -1 29 42" style="position: absolute; top: 6px; left: 4px; z-index: 1; opacity: 0.15; filter: blur(4px);" xmlns="http://www.w3.org/2000/svg">
						<ellipse cx="18" cy="35" rx="10" ry="6" style="fill: #000;"/>
					</svg>
					<!-- Marker -->
					<svg width="27" height="40" viewBox="-1 -1 29 42" style="position: relative; z-index: 2;" xmlns="http://www.w3.org/2000/svg">
						<path class="${MARKER_ICON_FILL_CLASS}" style="fill:#8c9092;stroke:#4d4d4d;stroke-width:2;" d="M13.5 0C6 0 0 6 0 13.5C0 22.5 13.5 40 13.5 40C13.5 40 27 22.5 27 13.5C27 6 21 0 13.5 0ZM13.5 20C10.7386 20 8.5 17.7614 8.5 15C8.5 12.2386 10.7386 10 13.5 10C16.2614 10 18.5 12.2386 18.5 15C18.5 17.7614 16.2614 20 13.5 20Z"/>
					</svg>
				</div>
			`,
			iconSize: [27, 40],
			iconAnchor: [13.5, 40],
			popupAnchor: [0, -42],
		})
	}, [alarm])

	return (
		<LeafletMarker position={position} icon={marker}>
			{children}
		</LeafletMarker>
	)
}
