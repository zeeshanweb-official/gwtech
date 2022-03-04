import mongoose from 'mongoose';

const ticketCountersSchema = new mongoose.Schema({
  
 tuid: {
   type: String,
   unique: true
 },
 tuseq: {
   type: Number,
   unique: true
 }
})

const TicketCounters = mongoose.model('ticketCounters', ticketCountersSchema)
export default TicketCounters;
