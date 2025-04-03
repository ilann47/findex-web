import { useState } from 'react'

import { Stack } from '@mui/material'
import { Sketch } from '@uiw/react-color'

import { Button } from '@/components/ui/inputs/button'
import { openModal, useModal } from '@/components/ui/modal'
import { ConfirmationModal } from '@/components/ui/modal/confirmation'
import { Text } from '@/components/ui/text'
import { ENDPOINTS } from '@/constants/endpoints'
import { useMutate } from '@/hooks/mutate'
import { AlarmColor as AlarmColorType } from '@/schemas/alarm/color'
import { AlarmType } from '@/schemas/alarm/type'
import { Message } from '@/types/i18n'
import { snakeToKebabCase } from '@/utils/convert-cases'

interface Props {
	alarmColor: AlarmColorType
	alarmType: AlarmType
}

export const AlarmColor = ({ alarmColor, alarmType }: Props) => {
	const [color, setColor] = useState(alarmColor.color)

	const confirmationModalRef = useModal()

	const { patch } = useMutate({
		endpoint: `${ENDPOINTS.ALARM_COLOR}/${alarmColor.id}`,
		invalidateQueries: [[ENDPOINTS.ALARM_COLOR]],
	})

	return (
		<Stack gap={2}>
			<Text message={`alarm.${snakeToKebabCase(alarmType)}` as Message} variant='h2' />

			<Stack gap={1}>
				<Text message='setting.current-color' variant='h4' />

				<Stack sx={{ height: (theme) => theme.spacing(4), bgcolor: alarmColor.color }} />
			</Stack>

			<Stack p={2} bgcolor='#FFF' alignItems='center'>
				<Sketch
					color={color}
					onChange={(newColor) => setColor(newColor.hex)}
					style={{ background: '#FFF', boxShadow: 'none' }}
					width={'100%' as unknown as number}
				/>
			</Stack>

			<Button
				variant='contained'
				label='form.save'
				disabled={color == alarmColor.color}
				onClick={openModal(confirmationModalRef)}
			/>

			<ConfirmationModal
				modalRef={confirmationModalRef}
				title='setting.change-color-confirmation-modal.title'
				description='setting.change-color-confirmation-modal.description'
				onConfirm={() =>
					patch({
						body: {
							color,
							alarmType: alarmColor.alarmType,
						},
						successMessage: 'setting.feedback.updated-alarm-color',
					})
				}
			/>
		</Stack>
	)
}
