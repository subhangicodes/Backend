class ApiResponse {
    constructor(statusCode,message="Success",data){
       this.statusCode=statusCode,
       this.message=message,
       this.data=data,
       this.success=statusCode < 400
    }
}
export {ApiResponse}

// it used to  maintain the standardized way so that when response will come always in the same manner 