import {aj} from "../config/arcjet.config.js";

export const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {requested: 1});
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()) return res.status(429).json({msg: "Too many requests"});
            if(decision.reason.isBot()) return res.status(403).json({msg: "Bot detected"});
            return res.status(403).json({msg: "Forbidden"});
        }
        next();
    } catch (error) {
        next(error);
    }
};