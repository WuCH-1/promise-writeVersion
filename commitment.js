class Commitment {
    static PENDING = 'PENDING'
    static FULFILLED = 'FULFILLED'
    static REJECTED = 'REJECTED'
    constructor(func){
        this.status = Commitment.PENDING
        this.result = null
        this.resolveCallbacks = []
        this.rejectCallbacks = []
        
        try{
            func(this.resolve.bind(this),this.reject.bind(this))
        } catch (errer) {
            this.reject(error)
        }
    }

    resolve(result) {
        queueMicrotask(()=>{
            if (this.status === Commitment.PENDING) {
                this.status = Commitment.FULFILLED
                this.result = result
                this.resolveCallbacks.forEach(callback => {
                    callback(result)
                })
            }
        })
    }
    reject(result) {
        queueMicrotask(()=>{
            if(this.status === Commitment.PENDING) {
                this.status = Commitment.REJECTED
                this.result = result
                this.rejectCallbacks.forEach(callback =>{
                    callback(result)
                })
            }
        })
    }
    then(onFULFILLED,onREJECTED) {
        return new Commitment((resolve,reject)=>{
            onFULFILLED = typeof onFULFILLED === 'function' ? onFULFILLED : () => {}
            onREJECTED = typeof onREJECTED  === 'function' ? onREJECTED  : () => {}

            if(this.status === Commitment.PENDING){
                this.resolveCallbacks.push(onFULFILLED)
                this.rejectCallbacks.push(onREJECTED)
            }
            if(this.status === Commitment.FULFILLED){
                setTimeout(()=>{
                    onFULFILLED(this.result)
                })
            }
            if(this.status === Commitment.REJECTED){
                setTimeout(()=>{
                    onREJECTED(this.result)
                })
            }
        })
    }
}

console.log('000')
let promise = new Commitment((res,rej)=>{
    console.log('111')
    setTimeout(()=>{
        res('222')
        console.log('666')
    })
})
promise.then(res=>{console.log(res); return 1}).then(res=>{console.log(res)})