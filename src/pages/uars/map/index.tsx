import { MarkerCluster as MarkerClusterType } from 'leaflet'
import { Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'

import { AlarmMapLegend } from '@/components/alarm/map-legend'
import { UarPreview } from '@/components/uar/preview'
import { Map } from '@/components/ui/map'
import { Marker } from '@/components/ui/map/marker'
import { MarkerCluster } from '@/components/ui/map/marker-cluster'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetAll } from '@/hooks/get'
import { Uar } from '@/schemas/uar'
import { geHigherPriorityAlarm } from '@/utils/alarm'

const MapSection = () => {
	const { data: uars } = useGetAll<Uar>({ endpoint: ENDPOINTS.UAR })

	return (
		<Map size='large'>
			<MarkerClusterGroup
				chunkedLoading
				iconCreateFunction={(cluster: MarkerClusterType) => MarkerCluster(cluster)}
			>
				{uars.map((uar) => {
					if (uar.location?.latitude && uar.location?.longitude) {
						return (
							<Marker
								position={[uar.location.latitude, uar.location.longitude]}
								key={uar.id}
								alarm={geHigherPriorityAlarm(uar.alarms)}
							>
								<Popup>
									<UarPreview uar={uar} />
								</Popup>
							</Marker>
						)
					}
				})}
			</MarkerClusterGroup>

			<AlarmMapLegend />
		</Map>
	)
}

export default MapSection
