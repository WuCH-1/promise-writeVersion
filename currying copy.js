const add = (a,b,c,d)=>{return a+b+c+d}

const currying = function(func) {
    let len = func.length
    let args = []
    const _curry = function() {
         args = args.concat([...arguments])
         if(len<=args.length){
           let cloneArgs = [...args]
           args.length = 0
           return func(...cloneArgs)
         }else{
            return _curry
         } 
    }
    return _curry
}

// function curry(fn) {
//   return _curry.call(this, fn, fn.length);
// }
// function _curry(fn, len, ...args) {
//   return function(...params) {
//     const _args = args.concat(params);
//     if (_args.length >= len) {
//       return fn.apply(this, _args);
//     } else {
//       return _curry.call(this, fn, len, ..._args);
//     }
//   }
// }

const addCurry = currying(add);
console.log(addCurry(1,2,3)(4))
console.log(addCurry)
console.log(addCurry(1)(2)(3)(4))