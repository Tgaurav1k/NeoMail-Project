import { User } from "../models/user.model.js";
import { Email } from "../models/email.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SYSTEM_EMAIL = "team@neomail.app";

const ensureSystemUser = async () => {
  let systemUser = await User.findOne({ email: SYSTEM_EMAIL });
  if (!systemUser) {
    const randomPassword = await bcrypt.hash(
      Math.random().toString(36) + Date.now().toString(36),
      10
    );
    systemUser = await User.create({
      fullname: "NeoMail Team",
      email: SYSTEM_EMAIL,
      password: randomPassword,
      profilePhoto: "https://avatar.iran.liara.run/public/boy",
    });
  }
  return systemUser;
};

const seedWelcomeEmails = async (newUser, systemUser) => {
  const firstName = newUser.fullname.split(" ")[0];
  const welcomeEmails = [
    {
      to: newUser.email,
      userId: systemUser._id,
      subject: "👋 Welcome to NeoMail!",
      message: `Hi ${firstName},\n\nWelcome aboard! We're thrilled to have you as part of the NeoMail community.\n\nNeoMail is built to be fast, secure, and beautifully simple — everything you need to manage your inbox without the noise.\n\nClick around, explore the interface, and let us know what you think.\n\n— The NeoMail Team`,
    },
    {
      to: newUser.email,
      userId: systemUser._id,
      subject: "✨ Quick tips to get you started",
      message: `Hey ${firstName},\n\nHere are a few things you can try right now:\n\n1. Click the blue Compose button on the left to send your first email.\n2. Click any email in your inbox to open and read it.\n3. Use the back arrow to return to the inbox at any time.\n4. Hover over emails to see hover effects and quick actions.\n\nThat's it — you're all set. Have fun!\n\n— The NeoMail Team`,
    },
    {
      to: newUser.email,
      userId: systemUser._id,
      subject: "🚀 Your inbox, your rules",
      message: `Hi ${firstName},\n\nA quick note about how NeoMail works:\n\n• Your messages are encrypted and stored securely\n• Older emails (7+ days) auto-archive to keep things tidy\n• You can sign in from any device — your inbox follows you\n\nIf you ever have questions, just reply to this email. We read every message.\n\nHappy emailing!\n\n— The NeoMail Team`,
    },
  ];
  await Email.insertMany(welcomeEmails);
};

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
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      profilePhoto,
    });

    // seed welcome emails (best-effort; don't fail signup if it errors)
    try {
      const systemUser = await ensureSystemUser();
      await seedWelcomeEmails(newUser, systemUser);
    } catch (err) {
      console.log("Welcome email seeding failed:", err);
    }

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