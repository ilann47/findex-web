import { MarkerCluster as MarkerClusterType } from 'leaflet'
import { Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'

import InstrumentMapLegend from '@/components/instrument/map-legend'
import InstrumentPreview from '@/components/instrument/preview'
import { Map } from '@/components/ui/map'
import { Marker } from '@/components/ui/map/marker'
import { MarkerCluster } from '@/components/ui/map/marker-cluster'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetAll } from '@/hooks/get'
import { Instrument } from '@/schemas/instrument'

const MapSection = () => {
	const { data: instruments } = useGetAll<Instrument>({ endpoint: ENDPOINTS.INSTRUMENT })

	return (
		<Map size='large'>
			<MarkerClusterGroup
				chunkedLoading
				iconCreateFunction={(cluster: MarkerClusterType) => MarkerCluster(cluster)}
			>
				{instruments.map((instrument) => {
					if (instrument.location?.latitude && instrument.location?.longitude) {
						return (
							<Marker
								position={[instrument.location.latitude, instrument.location.longitude]}
								key={instrument.id}
								alarm={instrument.hasAlarm ? 'SENSOR_FAILURE' : 'NORMAL'}
							>
								<Popup>{<InstrumentPreview instrument={instrument} />}</Popup>
							</Marker>
						)
					}
				})}
			</MarkerClusterGroup>

			<InstrumentMapLegend />
		</Map>
	)
}

export default MapSection
