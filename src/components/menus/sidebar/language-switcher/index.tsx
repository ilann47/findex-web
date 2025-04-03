import { MenuItem, Select, Stack } from '@mui/material'

import Br from '@/assets/images/flags/br.svg?react'
import Py from '@/assets/images/flags/py.svg?react'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { useLocale } from '@/hooks/locale'

interface Props {
	color?: 'white' | 'black'
}

const LanguageSwitcher: React.FC<Props> = ({ color = 'white' }) => {
	const { locale, changeLocale } = useLocale()

	const formatMessage = useFormatMessage()

	const changeLanguage = () => {
		if (locale == 'pt') changeLocale('es')
		else changeLocale('pt')
	}

	return (
		<Stack width='100%' paddingX={3}>
			<Select
				value={locale}
				onChange={changeLanguage}
				variant='standard'
				disableUnderline
				sx={{
					color: (theme) => (color == 'white' ? '#FFF' : theme.palette.juicy.neutral[100]),
					'.MuiSvgIcon-root ': {
						fill: color == 'white' ? 'white !important' : 'gray',
					},
					alignContent: 'center',
					alignItems: 'center',
				}}
				fullWidth
			>
				<MenuItem value='pt'>
					<Stack direction='row' alignItems='center' gap={2}>
						<Br height={16} />
						{formatMessage('portuguese')}
					</Stack>
				</MenuItem>
				<MenuItem value='es'>
					<Stack direction='row' alignItems='center' gap={2}>
						<Py height={16} />
						{formatMessage('spanish')}
					</Stack>
				</MenuItem>
			</Select>
		</Stack>
	)
}

export default LanguageSwitcher
