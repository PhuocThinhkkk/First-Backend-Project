
import aj from "../config/arcjet.js"

export const arcjetMiddleWare = async (req, res, next) => {
    try {
        const decision = await aj.protect(req , { requested: 5 } );
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({ message: "Rate Limit"});
            }else if(decision.reason.isBot()){
                return res.status(403).json({ message: "Bot detected"})
            }else{
                return res.status(403).json({ message: "nosososo"})
            }
        }
        
        next();
    } catch (error) {
        console.log("error arcject middleware: ", error);
        next(error);
    }
    

}