import {
	ForwardRefRenderFunction,
	ReactNode,
	forwardRef,
	useCallback,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

import { Popover as MuiPopover, Stack, StackProps } from '@mui/material'

import { Text } from '../text'
import { theme } from '@/theme'
import { Message } from '@/types/i18n'

export interface PopoverProps extends Omit<StackProps, 'title'> {
	children: ReactNode
	title?: Message
}

export interface PopoverOptions {
	openPopover: (element: HTMLElement) => void
	closePopover: () => void
}

export const Popover: ForwardRefRenderFunction<PopoverOptions, PopoverProps> = (
	{ children, title, ...otherProps },
	ref
) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

	const openPopover = useCallback((element: HTMLElement) => {
		setAnchorEl(element)
	}, [])

	const closePopover = useCallback(() => {
		setAnchorEl(null)
	}, [])

	const isOpened = !!anchorEl

	useImperativeHandle(ref, () => ({
		openPopover,
		closePopover,
	}))

	return (
		<MuiPopover
			open={isOpened}
			anchorEl={anchorEl}
			onClose={closePopover}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			sx={{
				'& .MuiPopover-paper': {
					borderRadius: 0,
				},
			}}
		>
			<Stack {...otherProps} padding={2}>
				{title && (
					<Text
						sx={{
							fontSize: 18,
							fontWeight: theme.typography.fontWeightMedium,
						}}
						message={title}
					/>
				)}
				{children}
			</Stack>
		</MuiPopover>
	)
}

export default forwardRef(Popover)

export const usePopover = () => useRef<PopoverOptions>(null)

export const openPopover = (ref: React.RefObject<PopoverOptions>) => (element: HTMLElement) =>
	ref.current?.openPopover(element)

export const closePopover = (ref: React.RefObject<PopoverOptions>) => () => ref.current?.closePopover()
