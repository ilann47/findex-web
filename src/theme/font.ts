import IBMPlexSansBold from '@/assets/font/IBMPlexSans-Bold.ttf'
import IBMPlexSansExtraLight from '@/assets/font/IBMPlexSans-ExtraLight.ttf'
import IBMPlexSansLight from '@/assets/font/IBMPlexSans-Light.ttf'
import IBMPlexSansMedium from '@/assets/font/IBMPlexSans-Medium.ttf'
import IBMPlexSansRegular from '@/assets/font/IBMPlexSans-Regular.ttf'
import IBMPlexSansSemiBold from '@/assets/font/IBMPlexSans-SemiBold.ttf'

const extraLight = `
	@font-face {
		font-family: 'IBM Plex Sans';
		font-style: normal;
		font-display: swap;
		font-weight: 200;
		src: local('IBM Plex Sans'), local('IBM Plex Sans'), url(${IBMPlexSansExtraLight}) format('truetype');
		unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
	}
`

const light = `
	@font-face {
		font-family: 'IBM Plex Sans';
		font-style: normal;
		font-display: swap;
		font-weight: 300;
		src: local('IBM Plex Sans'), local('IBM Plex Sans'), url(${IBMPlexSansLight}) format('truetype');
		unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
	}
`

const regular = `
	@font-face {
		font-family: 'IBM Plex Sans';
		font-style: normal;
		font-display: swap;
		font-weight: 400;
		src: local('IBM Plex Sans'), local('IBM Plex Sans'), url(${IBMPlexSansRegular}) format('truetype');
		unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
	}
`

const medium = `
	@font-face {
		font-family: 'IBM Plex Sans';
		font-style: normal;
		font-display: swap;
		font-weight: 500;
		src: local('IBM Plex Sans'), local('IBM Plex Sans'), url(${IBMPlexSansMedium}) format('truetype');
		unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
	}
`

const semiBold = `
	@font-face {
		font-family: 'IBM Plex Sans';
		font-style: normal;
		font-display: swap;
		font-weight: 600;
		src: local('IBM Plex Sans'), local('IBM Plex Sans'), url(${IBMPlexSansSemiBold}) format('truetype');
		unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
	}
`

const bold = `
	@font-face {
		font-family: 'IBM Plex Sans';
		font-style: normal;
		font-display: swap;
		font-weight: 700;
		src: local('IBM Plex Sans'), local('IBM Plex Sans'), url(${IBMPlexSansBold}) format('truetype');
		unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
	}
`

export const IBMPlexSans = {
	extraLight,
	light,
	regular,
	medium,
	semiBold,
	bold,
}
