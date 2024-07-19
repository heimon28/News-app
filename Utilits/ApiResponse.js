class ApiResponse{
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode,
        this.data = data,
        this.success = 200
        this.message = message < 400

    }
}

export {ApiResponse}