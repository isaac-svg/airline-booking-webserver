

function errorHandler(err,req,res,next){
    const error ={...err}
    error.message =  err.message
    if(err?.code===11000){
        error = new ResponseError("User already exists",400)
    }
    if(error?.name ==="ValidationError"){
        const message =  Object.values(err.errors).map(val=>val.message)
       error =  new ResponseError(message,400)
    }
    res.status(error.statusCode ||500).json({
        success:false,
        error:error.message || "Server Error"
    })
}
module.exports =  errorHandler