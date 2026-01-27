import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // if field are empty
    if (!fullname || !email || !password)
      return res
        .status(400)
        .json({ message: "All files are required", success: false });

    // if email found
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        message: "User already exist with this email",
        success: false,
      });

    // password secret using hash in bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    //=> profile pic import from dynamic api we have to fetch
    const profilePhoto = `https://avatar.iran.liara.run/public/boy`;
    await User.create({
      fullname,
      email,
      password: hashedPassword,
      profilePhoto
  });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// for login
export const login = async (req, res) => {
  try {
    // take data from body
    const { email, password } = req.body;

    // check data is empty or not
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "All files are required", success: false });

    // if account not found
    const user = await User.findOne({ email });

    // check correct hai ki nhi
    if (!user)
      return res
        .status(401)
        .json({ messsage: "Incorrect email or password", success: false });

    // match username , password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res
        .status(401)
        .json({ messsage: "Incorrect email or password", success: false });
     
        // token generate for authendication
        const tokenData = {
            userId:user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'});
        
        // Cookie settings for production (cross-origin) and development
        const isProduction = process.env.NODE_ENV === 'production';
        const cookieOptions = {
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            secure: isProduction, // HTTPS only in production
            sameSite: isProduction ? 'none' : 'lax' // 'none' for cross-origin in production
        };
        
        return res
        .status(200)
        .cookie("token", token, cookieOptions)
        .json({
            message:`${user.fullname} logged in successfully.`,
          user,
        success:true})
  }  
  catch (error) {
    console.log(error);
  }
};

export const logout = async(req,res)=>{
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      maxAge: 0,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax'
    };
    
    return res.status(200)
    .cookie("token", "", cookieOptions)
    .json({message:"Logged out successfully."})
  } catch (error) {
    console.log(error);
  }
}