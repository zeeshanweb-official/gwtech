import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
{

}
, { strict: false }
);

const tickets = mongoose.model('ticket', ticketSchema);
export default tickets;

