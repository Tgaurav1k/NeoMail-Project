import jwt from "jsonwebtoken";

const isAuthenticated = async(req, res, next) =>{
    try {
        // required token login krne ke liye
        const token = req.cookies.token;
        
        // Debug logging (remove in production if needed)
        console.log("Auth check - Cookies:", req.cookies);
        console.log("Auth check - Token exists:", !!token);
      
        // if token is not found
        if(!token){
            return res.status(401)
            .json({message:"User not authenticated"});
        }
           // verify token from secret key
          const decode = await jwt.verify(token, process.env.SECRET_KEY);
            
          // check if token not found
          if(!decode){
             return res.status(401)
             .json({message:"Invalid token"});
          }
        req.id = decode.userId;
        next();

    }
     catch (error) {
        console.log("Auth error:", error);
        return res.status(401).json({ message: "Authentication failed", error: error.message });
    }
}
export default isAuthenticated;