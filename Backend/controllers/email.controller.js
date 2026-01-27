import {Email} from "../models/email.model.js"
import {User} from "../models/user.model.js"

export const createEmail = async(req,res)=>{
    try {
        // request id 
        const userId = req.id;
        
        //take data from my body 
        const {to,subject, message} = req.body;
      
        //condition if id not found
        if(!to || !subject || !message)
         return res
        .status(400)
        .json({message:"All fields are required",
            success:false });


        const email = await Email.create({
            to,
            subject,
            message,
            userId
        });
        
        // Populate sender information before sending response
        const populatedEmail = await Email.findById(email._id)
            .populate('userId', 'fullname email profilePhoto');
        
        return res
        .status(201)
        .json({email: populatedEmail})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            message: "Internal server error", 
            success: false 
        });
    }
}
 
// create for delete email
export const deleteEmail = async(req,res)=>{
    try {
        const emailId = req.params.id;

        // if email not found 
        if(!emailId) return res
        .status(400)
        .json({message:"Email id is required"});

        //  find email and delete it 
        const email = await Email.findById(emailId);
        
        // if not found 
        if(!email) return res
        .status(400)
        .json({message:"Email is not found"});

        // actually delete the mail
        await Email.findByIdAndDelete(emailId);

        return res.status(200)
        .json({message:"Email Deleted Successfully"})  ;

    } catch (error) {
        console.log(error)
    }
}

export const getAllEmailById = async(req,res)=>{
    try {
             const userId = req.id;

             // Get user's email address
             const user = await User.findById(userId);
             if (!user) {
                 return res.status(404).json({ message: "User not found" });
             }

             // Get emails where:
             // 1. userId matches (emails sent BY this user) OR
             // 2. to field matches user's email (emails received BY this user)
             const emails = await Email.find({
                 $or: [
                     { userId: userId },  // Sent emails
                     { to: user.email }   // Received emails
                 ]
             }).populate('userId', 'fullname email profilePhoto').sort({ createdAt: -1 });

             return res
             .status(200)
             .json({emails})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}