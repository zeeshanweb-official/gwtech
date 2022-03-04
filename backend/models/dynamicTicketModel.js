import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
{
    user_id:{
        type:String,
        required:true
    },
    ticket_id:{
        type:String,
        required:true
    },
    company_name:{
        type:String,
        required:true
    },
    sum:{
        type:String,
        required:true
    },
    mega_total:{
        type:String,
        required:true
    },
    lottery:{
        type:String,
        required:true
    },
    Data:{
        type:String,
        required:true
    },
    creation_time: { type: Date, required: true, unique: true,default:Date.now },
}
, { strict: false }
);

const tickets = mongoose.model('ticket', ticketSchema);
export default tickets;

