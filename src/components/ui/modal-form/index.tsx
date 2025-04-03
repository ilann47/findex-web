import { PropsWithChildren, RefObject, useCallback } from 'react'

import { FieldValues, useFormContext } from 'react-hook-form'

import Stepper, { Step } from './stepper'
import { Buttons } from '@/components/ui/inputs/buttons'
import Modal, { ModalOptions, closeModal } from '@/components/ui/modal'
import { Message } from '@/types/i18n'

interface baseProps<T extends FieldValues> extends PropsWithChildren {
	onSubmit: (data: T) => void
	title: Message
	description?: Message
	modalRef: RefObject<ModalOptions>
	width?: string
	primaryButtonLabel?: Message
	disabled?: boolean
	onClose?: () => void
}

interface ModalFormProps<T extends FieldValues> extends baseProps<T> {
	steps?: never
}

interface ModalStepperFormProps<T extends FieldValues> extends baseProps<T> {
	steps?: Step[]
}

type Props<T extends FieldValues> = ModalFormProps<T> | ModalStepperFormProps<T>

const ModalForm = <T extends FieldValues>({
	title,
	description,
	modalRef,
	children,
	steps,
	onSubmit,
	width,
	primaryButtonLabel,
	disabled,
	onClose,
}: Props<T>) => {
	const { handleSubmit, reset } = useFormContext()

	const onCloseForm = useCallback(() => {
		onClose && onClose()
		reset()
	}, [reset])

	return (
		<Modal ref={modalRef} onClose={onCloseForm} title={title} width={width} description={description}>
			<form onSubmit={handleSubmit(onSubmit as (data: FieldValues) => void)}>
				{children}

				{steps ? (
					<Stepper onSubmit={onSubmit} steps={steps} onClose={closeModal(modalRef)} />
				) : (
					<Buttons
						secondary={{ onClick: closeModal(modalRef) }}
						primary={{
							label: primaryButtonLabel ?? 'form.save',
							disabled,
							type: 'submit',
						}}
					/>
				)}
			</form>
		</Modal>
	)
}

export default ModalForm
