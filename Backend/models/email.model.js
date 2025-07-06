import mongoose, { Schema } from "mongoose"

const emailSchema = new mongoose.Schema({
    to:{
        type:String,
        require:true
    },
    subject:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    // generate relation between user and email

    userId:{
        type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    require:true
}
},{timestamps:true});

export const Email = mongoose.model("Email",emailSchema);