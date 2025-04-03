import { GridContainer } from '@/components/ui/container/grid'
import { Field } from '@/components/ui/field'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetAll } from '@/hooks/get'
import ChannelsLoading from '@/pages/instrument/acquisition/channels/loading'
import { Channel } from '@/schemas/channels'
import { Instrument } from '@/schemas/instrument'
import { Message } from '@/types/i18n'

interface Props {
	instrument: Instrument
}

const Channels = ({ instrument }: Props) => {
	const { data: channels, isLoading } = useGetAll<Channel>({
		endpoint: ENDPOINTS.CHANNEL,
		requestParams: {
			instrumentId: instrument.id,
		},
	})

	if (isLoading) return <ChannelsLoading instrumentType={instrument.type} />

	return (
		<GridContainer>
			{channels.map((channel) => (
				<Field
					key={channel.readingVariable}
					component='grid'
					labelId={`instrument.readings.${channel.readingVariable}` as Message}
				>
					{channel.lndbRef}
				</Field>
			))}
		</GridContainer>
	)
}

export default Channels
