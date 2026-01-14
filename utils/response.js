function successResponse(res,data = null,message='bruh',statusCode=200){
    return res.status(statusCode).json({
        success: statusCode < 400,
        message,
        error: "No Issue happened",
        errorStatus: statusCode > 400,
        data
    })
}


function errorResponse(res,data = null,message="Error", statusCode=400) {
    return res.status(statusCode).json({
        success: statusCode < 400,
        message: message,
        error: message,
        data
    })
}


module.exports = {successResponse, errorResponse};