import { Warning as WarningIcon } from '@carbon/icons-react'

import Warning, { WarningProps } from '..'
import { theme } from '@/theme'

export const InfoWarning = (props: Omit<WarningProps, 'icon'>) => {
	return <Warning {...props} icon={<WarningIcon size={32} color={theme.palette.juicy.neutral[70]} />} />
}
