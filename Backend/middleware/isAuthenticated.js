import jwt from "jsonwebtoken";

const isAuthenticated = async(req, res, next) =>{
    try {
        // required token login krne ke liye
        const token = req.cookies.token;
        
        // emails get 
        // // console.log(token);
      
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
        console.log(error);
    }
}
export default isAuthenticated;