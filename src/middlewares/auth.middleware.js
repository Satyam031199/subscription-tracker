import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/env.js";
import User from "../models/user.model.js";

export const authorize = async (req, res, next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token) {
            const error = new Error('Unauthorized');
            error.statusCode = 401;
            throw error;
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;
        const user = await User.findById(userId);
        if(!user) {
            const error = new Error('Unauthorized');
            error.statusCode = 401;
            throw error;
        }
        req.user = user;
        next();
    }catch (error) {
        next(error);
    }
}