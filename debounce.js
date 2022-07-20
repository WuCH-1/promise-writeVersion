function debounce(fun, delay) {
	let time = null
	return function () {
		if (time) {
			clearTimeout(time)
		}
		time = setTimeout(() => { fun.apply(this, arguments); time = null }, delay)
	}
}


function throttle(fun, delay) {
	let time = null
	return function (...arg) {
		if (time) {
			return
		}
		time = setTimeout(() => {
			fun.apply(this, ...arg); now = delay
		}, delay)
	}
}