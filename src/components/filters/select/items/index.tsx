import { useRef } from 'react'

import { Stack } from '@mui/material'
import { useVirtualizer } from '@tanstack/react-virtual'

import Loading from '@/components/ui/feedback/loading'
import { InfoWarning } from '@/components/ui/feedback/warning/info'
import Checkbox from '@/components/ui/inputs/checkbox'
import { LabelValue } from '@/types/label-value'

interface Props {
	items: LabelValue<string | boolean>[]
	isChecked: (item: string) => boolean
	handleSelect: (item: string) => void
	isLoading?: boolean
}

const SelectFilterItems = ({ items, isChecked, handleSelect, isLoading }: Props) => {
	const parentRef = useRef<HTMLDivElement>(null)

	const rowVirtualizer = useVirtualizer({
		count: items.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 35,
		overscan: 5,
	})

	if (isLoading) return <Loading />

	if (items.length === 0)
		return (
			<Stack mt={2}>
				<InfoWarning descriptionId='table.filtering.no-results.title' />
			</Stack>
		)

	return (
		<Stack
			ref={parentRef}
			sx={{
				maxHeight: (theme) => theme.spacing(20),
				overflowY: 'auto',
				overflowX: 'hidden',
				textWrap: 'nowrap',
			}}
		>
			<Stack
				sx={{
					height: `${rowVirtualizer.getTotalSize()}px`,
					position: 'relative',
				}}
			>
				{rowVirtualizer.getVirtualItems().map((virtualRow) => {
					const item = items[virtualRow.index]
					return (
						<Stack
							key={item.value.toString()}
							sx={{
								position: 'absolute',
								height: `${virtualRow.size}px`,
								transform: `translateY(${virtualRow.start}px)`,
							}}
						>
							<Checkbox
								id={item.value.toString()}
								checked={isChecked(item.value.toString())}
								label={item.label}
								onChange={() => handleSelect(item.value.toString())}
							/>
						</Stack>
					)
				})}
			</Stack>
		</Stack>
	)
}

export default SelectFilterItems
