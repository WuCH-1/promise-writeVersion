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

Function.prototype.myBind = function(context = window, ...args) {
    // this表示调用bind的函数
    let self = this;

    //返回了一个函数，...innerArgs为实际调用时传入的参数
    let fBound = function(...innerArgs) {
        //this instanceof fBound为true表示构造函数的情况。如new func.bind(obj)
        // 当作为构造函数时，this 指向实例，此时 this instanceof fBound 结果为 true，可以让实例获得来自绑定函数的值
        // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
        return self.apply(
          this instanceof fBound ? this : context,
          args.concat(innerArgs)
        );
    }

    // 如果绑定的是构造函数，那么需要继承构造函数原型属性和方法：保证原函数的原型对象上的属性不丢失
    // 实现继承的方式: 使用Object.create
    fBound.prototype = Object.create(this.prototype);
    return fBound;
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
            } else {
                cloneTarget[prop] = target[prop];
            }
        }
        return cloneTarget
    }
    return target
}



function debounce(handle, delay) {
    let timer = null
    return function () {
        const context = this, args = arguments
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => { handle.call(context, ...args) }, delay)
    }
}

function throtter(handle, delay) {
    let flag = true
    return function () {
        const context = this
        if (!flag) {
            return
        }
        flag = !flag
        setTimeout(() => { flag = !flag }, delay)
        handle.call(context, ...arguments)
    }
}

function debounce(fun) {
    return function () {
        setTimeout(() => { fun.apply(this, arguments) }, 1000)
    }
}

function myInstanceof(left, right) {
    const rightPrototype = right.prototype
    let leftPrototype = left.__proto__
    while (true) {
        if (leftPrototype === null) {
            return false
        }
        if (leftPrototype === rightPrototype) {
            return true
        }
        leftPrototype = leftPrototype.__proto__
    }
}

class EventEmitter {
    constructor() {
        this.message = {}
    }
    on(name, callback) {
        if (!this.message[name]) {
            this.message[name] = [callback]
        } else {
            this.message[name].push(callback)
        }
    }
    emit(name, ...arg) {
        if (!this.message[name]) {
            return
        }
        this.message[name].forEach((item) => {
            item.apply(this, arg)
        })
    }

    off(type, fn) {
        if (!this.message[type]) return
        if (!fn) this.message[type] = []
        for (let i = this.message[type].length - 1; i >= 0; i--) {
            this.message[type][i] == fn && this.message[type].splice(i, 1)
        }
    }
    once(type, fn) {
        let callback = (...args) => {
            fn.apply(this, args)
            this.off(type, callback)
        }
        this.on(type, callback)
    }
}

