Function.prototype.mybind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('error')
    }
    const _this = this
    const args = [...arguments].slice(1)
    return function F() {
        if (this instanceof F) {
            return _this(...args, ...arguments)
        }
        return _this.apply(context, args.concat(...arguments))
    }
}

Function.prototype.mycall = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('error')
    }
    const obj = context || window
    obj.fn = this
    const args = [...arguments].slice(1)
    var result = obj.fn(...args)
    delete obj.fn
    return result
}
Function.prototype.myapply = function (context = window, arr) {
    if (typeof this !== 'function') {
        throw new TypeError('error')
    }
    context.fn = this
    var result = context.fn(...arr)
    delete context.fn
    return result
}

function myNew(Fn, ...args) {
    if (typeof Fn !== 'function') {
        throw new TypeError('errpr')
    }
    let obj = Object.create(Fn.prototype)
    let res = Fn.apply(obj, args)
    return res instanceof Object ? res : obj
}

function myCreate(parent) {
    function Fn() { }
    Fn.prototype = parent
    var result = new Fn()
    return result
}

function shollowClone(target) {
    if (typeof target === 'object' && target !== null) {
        var cloneTarget = Array.isArray(target) ? [] : {}
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                cloneTarget[prop] = target[prop];
            }
        }
        return cloneTarget
    }
    return target
}

function deepClone(target) {
    if (typeof target === 'object' && target !== null) {
        var cloneTarget = Array.isArray(target) ? [] : {}
        for (let prop in target) {
            if (typeof target[prop] === 'object' && target[prop] !== null) {
                cloneTarget[prop] = deepClone(target[prop])
            }else{
                cloneTarget[prop] = target[prop];
            }
        }
        return cloneTarget
    }
    return target
}
obj={b:{a:1,c:2},d:'obj'}

console.log(deepClone(obj))
