const asyncHandler = (requestHandler)=>{
    return (req,resp,next)=>{
        Promise.resolve(requestHandler(req,resp,next)).
        catch((err)=>next(err))
    }
}


export {asyncHandler}

// this code is used to handle the try catch or promises like resolve reject