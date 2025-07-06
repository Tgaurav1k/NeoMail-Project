import {Email} from "../models/email.model.js"

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
        return res
        .status(201)
        .json({email})
    } catch (error) {
        
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

             const emails = await Email.find({userId});

             return res
             .status(200)
             .json({emails})

    } catch (error) {
        console.log(error)
        
    }
}