// function add(a,b,c,d) {
//     return a+b+c+d
// }

// function curry(fn) {
//   return _curry.call(this, fn, fn.length)
// }
// function _curry(fn,len,...args) {
//     return function(...params) {
//         const _args = args.concat(params)
//         if(_args.length>=len){
//              return fn.apply(this,_args)
//         }else{
//             return _curry.call(this,fn, len,..._args)
//         }
//     }
// }





// const addCurry = curry(add);
// console.log(addCurry(1,2,3)(4))
// console.log(addCurry(1)(2)(3)(4))

// 实现一个add方法，使计算结果能够满足如下预期：
console.log(add(1)(2)(3).toString()) // 6;
console.log(add(1, 2, 3)(4)) // 10;
console.log(add(1)(2)(3)(4)(5)) // 15;

function add(){
    let args = [...arguments];
    function _add(){
        args = args.concat([...arguments])
        return _add
    }
    _add.toString=function(){
      return args.reduce((pre,cur)=>{
            return pre+cur
        })
    }
    return _add;
}