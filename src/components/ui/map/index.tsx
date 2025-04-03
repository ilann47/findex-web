import { ReactNode } from 'react'

import { MapContainer, TileLayer } from 'react-leaflet'

import './styles.css'
import 'leaflet/dist/leaflet.css'

interface Props {
	children: ReactNode
	size?: 'small' | 'normal' | 'large'
	zoom?: number
	center?: [number, number]
}

export const Map = ({
	children,
	size = 'normal',
	zoom = 15,
	center = [-25.419_218_237_616_92, -54.596_047_442_975_88],
}: Props) => {
	return (
		<MapContainer
			center={center}
			zoom={zoom}
			style={{ height: `${size == 'small' ? 30 : size == 'large' ? 75 : 40}vh` }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			{children}
		</MapContainer>
	)
}
