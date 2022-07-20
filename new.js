function myNew(consturctor, ...args) {
    const obj = {}
    obj.__proto__ = consturctor.prototype
    const result = consturctor.apply(obj, args)
    return result instanceof Object ? result : obj;
}
// 创建一个空对象->继承构造函数的原型->改变当前this指向，为对象设置属性->返回新对象