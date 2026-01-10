function errorResponse(statusCode=400, message="",errorMessage=""){
    return status(statusCode).json({
        success: false,
        message: message,
        error:errorMessage,
    });
}

function successResponse(statusCode=200, message="", errorMessage=""){
    status(statusCode).json({
        success:true,
        message:message,
        errorMessage:errorMessage
    });
}

module.exports = {successResponse, errorResponse};