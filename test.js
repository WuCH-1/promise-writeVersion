class promise {
    constructor(func) {
        this.status = 'PANDING'
        this.val = null
        this.resolveCallbacks = []
        this.rejectCallbacks = []

        try {
            fun(this.resolve.bind(this), this.jectect.bind(this))
        } catch (err) {
            this.reject(err)
        }
    }
    resolve(res) {
        queueMicrotask(() => {
            if (this.status !== 'PANDING') return
            this.status = 'FULFILLED'
            this.val = res
            this.resolveCallbacks.forEach(callback => {
                callback(result)
            })

        })
    }
    jectect(res) {
        queueMicrotask(() => {
            if (this.status !== 'PANDING') return
            this.status = 'REJUECTED'
            this.val = res
            this.rejectCallbacks.forEach(callback => {
                callback(result)
            })
        })
    }
    than(onResolve, onReject) {
        return new promise((resolve, jectect) => {
            if (this.status === 'FULFILLED') {
                typeof onResolve === 'function' && this.onResolve(this.val)
            }
            if (this.status === 'REJUECTED') {
                typeof onReject === 'function' && this.onResolve(this.val)
            }
            if (this.status === 'PANDING') {
                typeof onReject === 'function' && this.resolveCallbacks.push(this.onResolve(this.val))
                typeof onReject === 'function' && this.rejectCallbacks.push(this.onResolve(this.val))
            }
        })
    }
}