// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

// const isLocalhost = Boolean(
// 	window.location.hostname === 'localhost' ||
// 		// [::1] is the IPv6 localhost address.
// 		window.location.hostname === '[::1]' ||
// 		// 127.0.0.0/8 are considered localhost for IPv4.
// 		window.location.hostname.match(
// 			/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
// 		),
// )

export function register() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register('/sw.js')
			.then((registration) => {
				console.log('Service Worker registered: ', registration)

				registration.onupdatefound = () => {
					const installingWorker = registration.installing
					if (installingWorker) {
						installingWorker.onstatechange = () => {
							if (installingWorker.state === 'installed') {
								if (navigator.serviceWorker.controller) {
									console.log('New content is available; please refresh.')
									// if (confirm('New version available. Do you want to update?')) {
									// 	window.location.reload()
									// }
									const event = new Event('update-available')
									window.dispatchEvent(event)
								} else {
									console.log('Content is cached for offline use.')
								}
							}
						}
					}
				}
			})
			.catch((error) => {
				console.error('Error during service worker registration:', error)
			})
	}
}

export function unregister() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.ready
			.then((registration) => {
				registration.unregister()
			})
			.catch((error) => {
				console.error(error.message)
			})
	}
}
