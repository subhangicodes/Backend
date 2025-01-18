class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        errors=[],
        stack=""
    ){
        super(message),
        this.statusCode=statusCode,
        this.data=null,
        this.message=message,
        this.success=false,
        this.errors=errors

        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}

// it used to  maintain the standardized way so that when error will come always in the same manner