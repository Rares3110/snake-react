/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				'russian-violet': '#171140',
				'midnight-blue': '#231961',
				'space-cadet': '#29335C',
				'darker-space-cadet': '#202746'
			},
			boxShadow: {
				'navbar-darker-space-cadet': '0px 6px 10px 4px rgba(25, 30, 56, 0.3)',
				'video-home': 'inset 0px -14px 20px -8px rgba(32, 38, 70, 1)',
				'button': 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
				'login-form': 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px'
			}
		},
	},
	plugins: [],
}
