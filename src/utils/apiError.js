class ApiError extends Error{
    constructor(status , message="Something went wrong" , stack="" , errors=[]){
        super(message)
        this.status = status 
        this.errors = errors
        this.success = false
        if(stack){
            this.stack = stack 
        }
        else{
            Error.captureStackTrace(this , this.constructor)
        }
    }
}

export {ApiError}