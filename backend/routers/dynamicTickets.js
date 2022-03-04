import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import tickets from '../models/dynamicTicketModel.js';
import TicketCounters from "../models/ticketCounterModel.js";
const ticketsRouter = express.Router();

const getNextSequence = async (name) => {
  const filter = { tuid: name }
  const update = { $inc: { tuseq: 1 } }
  const ret = await TicketCounters.findOneAndUpdate(filter, update, {
    new: true
  })

  return ret.tuseq;
}


ticketsRouter.post(
 '/ticket',
 expressAsyncHandler(async (req, res) => {
  const count = await getNextSequence('tic');
   req.body.ticket_id = parseInt(count);
   let body = req.body
   const testCollectionData = new tickets(body)
   await testCollectionData.save()
   return res.send({
       "msg": "Ticket Saved Successfully",
       "_id": testCollectionData.ticket_id
   })
 })
);




ticketsRouter.get(
  '/ticket',
  expressAsyncHandler(async (req, res) => {
    const tickersuser = await tickets.
    find()    
    res.send(tickersuser);
  })
);

ticketsRouter.get(
  '/ticket/:id',
  expressAsyncHandler(async (req, res) => {
    const ticketuser = await tickets.findById(req.params.id)
    if (ticketuser) {
      res.send(ticketuser);
    } else {
      res.status(404).send({ message: 'Ticket Not Found' });
    }
  })
);


ticketsRouter.delete(
  '/ticket/:id',
  expressAsyncHandler(async (req, res) => {
    const tickeruser = await tickets.findById(req.params.id);
    if (tickeruser) {
      const deleteTicket = await tickeruser.remove();
      res.send({ message: 'Ticket Deleted', tickeruser: deleteTicket });
    } else {
      res.status(404).send({ message: 'Ticket Not Found' });
    }
  })
);

export default ticketsRouter;
