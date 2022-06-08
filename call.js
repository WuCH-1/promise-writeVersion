function myCall (thisArg,...args) {
    thisArg =(thisArg === undefined||thisArg === null )? window:Object(thisArg)
    thisArg.fn = this //获取当前函数
    args = args || [] //如果arg不存在，就将其设置为[],方便解构
    let res = thisArg.fn(...args) //用传入的对象调用函数
    delete thisArg.fn //执行完之后就删除该对象上的属性
    return res
}

Function.prototype.myCall = myCall

Function.prototype.myApply = function (thisArg,arr){
    thisArg = (thisArg === undefined||thisArg === null)? window:Object(thisArg)
    thisArg.fn = this
    arr = arr || []
    let res = thisArg.fn(...arr)
    delete thisArg.fn
    return res
}

Function.prototype.myBind = function(obj,...args){
    let thisArg =  (obj === undefined||obj === null)? window:Object(obj)
    let fn = this
    return function(...args2){
        thisArg.fn = fn
        let args1 = [...args,...args2]
        console.log(args1)
        let res = thisArg.fn(...args1)
        delete thisArg.fn
        return res
    }
}

function add(a, b){
    return a + b + this.c
}

console.log(add.myCall({c:1},1,1))
console.log(add.myApply({c:1},[1,1]))

console.log(add.myBind({c:2})(1,1))