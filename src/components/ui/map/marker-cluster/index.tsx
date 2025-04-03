import { MarkerCluster as MarkerClusterType, divIcon } from 'leaflet'
import ReactDOMServer from 'react-dom/server'

import { ALARM_TYPES } from '@/constants/alarm'
import { MARKER_ICON_CLASS } from '@/hooks/alarm-colors'
import { getAlarmDarkColor, getAlarmDarkTransparentColor, getAlarmLightColor } from '@/utils/alarm'

export const MarkerCluster = (cluster: MarkerClusterType) => {
	const getClusterColor = (intensity: 'light' | 'dark' | 'dark-transparent') => {
		const markers = cluster.getAllChildMarkers()

		const markersClassNames = new Set(markers.map((marker) => marker.options.icon?.options.className ?? ''))

		const getColor =
			intensity == 'light'
				? getAlarmLightColor
				: intensity == 'dark'
					? getAlarmDarkColor
					: getAlarmDarkTransparentColor

		// gets current alarm according to priority alarms priority (ALARM_TYPES is in order)
		const alarm = ALARM_TYPES.find((type) => markersClassNames.has(`${MARKER_ICON_CLASS} ${type}`))!

		return getColor(alarm)
	}

	return divIcon({
		html: ReactDOMServer.renderToString(
			<div
				style={{
					backgroundColor: getClusterColor('dark-transparent'),
					borderRadius: '50%',
					width: '40px',
					height: '40px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<div
					style={{
						backgroundColor: getClusterColor('dark-transparent'),
						borderRadius: '50%',
						width: '35px',
						height: '35px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							backgroundColor: getClusterColor('light'),
							borderRadius: '50%',
							width: '30px',
							height: '30px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: getClusterColor('dark'),
						}}
					>
						{cluster.getChildCount()}
					</div>
				</div>
			</div>
		),
		className: 'custom-cluster-icon',
	})
}
