import { Path } from 'react-hook-form'
import { PrimitiveType } from 'react-intl'

import messages from '@/messages.json'

export type Locale = 'es' | 'pt'

export type MessageId = Path<(typeof messages)['pt'] & (typeof messages)['es']>

export type MessageValues = { [key: string]: PrimitiveType }

export type MessageIdAndValues = { id: MessageId; values: MessageValues }

export type Message = MessageId | MessageIdAndValues

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace FormatjsIntl {
		interface Message {
			ids: MessageId
		}
	}
}
