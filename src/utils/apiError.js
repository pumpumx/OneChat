class ApiError extends Error{
    constructor(status , message="Something went wrong" , stack="" , errors=[]){
        super(message)
        this.status = status 
        this.errors = Array.isArray(errors) && errors.length > 0 ? errors : [{message}]
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