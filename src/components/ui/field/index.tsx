import { PropsWithChildren, ReactNode } from 'react'

import { Grid, GridProps, Skeleton, Stack, Typography } from '@mui/material'

import { useLoading } from '@/contexts/loading'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { useFormatNumber } from '@/hooks/i18n/format-number'
import { Message } from '@/types/i18n'

interface Props extends Omit<GridProps, 'component' | 'direction'>, PropsWithChildren {
	labelId: Message
	component?: 'grid' | 'stack'
	direction?: 'vertical' | 'horizontal'
	showColon?: true
}

export const Field = ({
	labelId,
	children,
	component = 'stack',
	direction = 'vertical',
	showColon,
	...otherProps
}: Props) => {
	if (component == 'grid') {
		return (
			<Grid item xs={1} {...otherProps}>
				<FieldContent labelId={labelId} direction={direction} showColon={showColon}>
					{children}
				</FieldContent>
			</Grid>
		)
	}

	return (
		<Stack {...otherProps}>
			<FieldContent labelId={labelId} direction={direction} showColon={showColon}>
				{children}
			</FieldContent>
		</Stack>
	)
}

const FieldContent = ({ labelId, children, direction, showColon }: Omit<Props, 'component'>) => {
	const isLoading = useLoading()
	const formatMessage = useFormatMessage()
	const formatNumber = useFormatNumber()

	const formatFieldContent = (value: ReactNode) => {
		if (!value) return '-'
		if (typeof value === 'number') return formatNumber(value)
		return value
	}

	return (
		<Stack {...(direction == 'horizontal' && { direction: 'row', alignItems: 'center', gap: 1 })}>
			{labelId && (
				<Typography variant='h4'>
					{formatMessage(labelId)}
					{showColon && ':'}
				</Typography>
			)}
			{isLoading ? <Skeleton variant='text' width='100%' /> : formatFieldContent(children)}
		</Stack>
	)
}
