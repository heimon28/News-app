import { User } from "../Models/users.model.js";
import { ApiError } from "../Utilits/ApiErrors.js";
import { ApiResponse } from "../Utilits/ApiResponse.js";
import jwt from "jsonwebtoken"
import { asyncHandler } from "../Utilits/asyncHandlar.js";

export const verfyJwt = asyncHandler(async (req, res, next) => {
    try {
        
        const token = await  req.cookies?.accessToken || req.header("Authorization")?.replace( "Bearer", "");
 
        if(!token){
            throw new ApiError(400, "Token is expired")
        }

        const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select( "-password -refreshToken")

        if(!user){
            throw new ApiError(400, 'invalid accessToken')
        }

        req.user = user;

        next()


    } catch (error) {
        throw new ApiError(401, 'Auth Middleware Error', error)
    }
})