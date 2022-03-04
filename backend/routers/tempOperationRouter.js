import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';
import tempOperation from '../models/tempOperationModel.js';

const tempOperationRouter = express.Router();


tempOperationRouter.post(
  '/temp_operation',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const temp_operation = new tempOperation({
     "date": req.body.date,
     "type": req.body.type,
     "kind": req.body.kind,
     "str_num": req.body.str_num,
     "opt1": req.body.opt1,
     "opt2": req.body.opt2,
     "opt3": req.body.opt3,
     "sum": req.body.sum,
     "imei": req.body.imei
    });
    const createdTempOperation = await temp_operation.save();
    res.send({ message: 'Temp Operation Created', temp_operation: createdTempOperation });
  })
);

tempOperationRouter.get(
  '/temp_operation',
  expressAsyncHandler(async (req, res) => {
    const temproraryOp = await tempOperation.find();
    res.send(temproraryOp);
  })
);


tempOperationRouter.get(
  '/temp_operation/:id',
  expressAsyncHandler(async (req, res) => {
    const temproraryOp = await tempOperation.findById(req.params.id)
    if (temproraryOp) {
      res.send(temproraryOp);
    } else {
      res.status(404).send({ message: 'Temprorary Opeartion Not Found' });
    }
  })
);


tempOperationRouter.put(
  '/temp_operation/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const tempOpeartionId = req.params.id;
    const temproraryOp = await tempOperation.findById(tempOpeartionId);
    if (temproraryOp) {
     temproraryOp.date = req.body.date,
     temproraryOp.type = req.body.type,
     temproraryOp.kind = req.body.kind,
     temproraryOp.str_num = req.body.str_num,
     temproraryOp.opt1 = req.body.opt1,
     temproraryOp.opt2 = req.body.opt2,
     temproraryOp.opt3 = req.body.opt3,
     temproraryOp.sum = req.body.sum,
     temproraryOp.imei = req.body.imei
      const updateTempOp = await temproraryOp.save();
      res.send({ message: 'Temp Operation Updated', updatedtempop: updateTempOp });
    } else {
      res.status(404).send({ message: 'Temp Operation Not Found' });
    }
  })
);

tempOperationRouter.delete(
  '/temp_operation/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const temproraryOp = await tempOperation.findById(req.params.id);
    if (temproraryOp) {
      const deleteTempOp = await temproraryOp.remove();
      res.send({ message: 'Temporary Operation Deleted', deletedTempOperation: deleteTempOp });
    } else {
      res.status(404).send({ message: 'Temp Operation Not Found' });
    }
  })
);

export default tempOperationRouter;
