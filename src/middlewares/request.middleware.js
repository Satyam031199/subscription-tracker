export const requestMiddleware = (req, res, next) => {
    try {
        console.log("%%%%%%% req.path: ", req.path, req.method);
        if(!req.path) return res.status(404).json({msg: "Invalid URI params"});
        decodeURIComponent(req.path);
        next();
    } catch (error) {
        next(error);
    }
}