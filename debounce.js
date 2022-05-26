function debounce(fun,delay){
	let time = null
	return ()=>{
		if(time){
			clearTimeout(time)
		}
		time = setTimeout(()=>{fun.apply(this,arguments);time=null},delay) 
	}
}
