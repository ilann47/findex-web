import { ReactNode, useState } from 'react'

import { Stepper as MuiStepper, Stack, Step, StepLabel } from '@mui/material'
import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form'

import { Buttons } from '@/components/ui/inputs/buttons'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { Message } from '@/types/i18n'

export interface Step {
	label: Message
	fields: string[]
	component: ReactNode
}

interface StepperProps<T extends FieldValues> {
	steps: Step[]
	onClose: () => void
	onSubmit: (data: T) => void
}

type Fields<T extends FieldValues> = keyof StepperProps<T>

const Stepper = <T extends FieldValues>({ steps, onClose, onSubmit }: StepperProps<T>) => {
	const [activeStep, setActiveStep] = useState(0)
	const { trigger, handleSubmit, reset } = useFormContext()
	const formatMessage = useFormatMessage()

	const submitForm: SubmitHandler<T> = (data) => {
		onSubmit(data)
		reset()
	}

	const canGoPrev = activeStep > 0
	const canGoNext = activeStep < steps.length - 1

	const handleNext = async () => {
		const fields = steps[activeStep].fields
		const output = await trigger(fields as Fields<T>[], { shouldFocus: true })

		if (!output) return

		if (canGoNext) {
			setActiveStep((prevActiveStep) => prevActiveStep + 1)
		} else {
			await handleSubmit(submitForm as () => void)()
			onClose()
		}
	}

	const handlePrev = () => {
		if (canGoPrev) {
			setActiveStep((prevActiveStep) => prevActiveStep - 1)
		} else {
			onClose()
		}
	}

	return (
		<>
			<MuiStepper activeStep={activeStep} sx={{ marginBottom: 2 }}>
				{steps.map((step) => (
					<Step key={step.label.toString()}>
						<StepLabel>{formatMessage(step.label)}</StepLabel>
					</Step>
				))}
			</MuiStepper>
			<Stack>{steps[activeStep].component}</Stack>
			<Buttons
				secondary={{ onClick: handlePrev, label: canGoPrev ? 'form.step.back' : 'form.cancel' }}
				primary={{
					onClick: handleNext,
					label: canGoNext ? 'form.step.next' : 'form.save',
				}}
			/>
		</>
	)
}

export default Stepper
