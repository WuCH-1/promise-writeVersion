function debounce(fn,delay) {
    let time = null
    return function (){
        clearTimeout(time)
        time = setTimeout(fun.apply(this,...arguments),delay)
    }
}
