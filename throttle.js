
function throttle(fun, delay) {
	let time = null
	return () => {
		if (!time) {
			time = setTimeout(() => {
				fun.apply(this, arguments)
				time = null
			}, delay)
		}
	}
}