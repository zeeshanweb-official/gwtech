import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';
import tempOperationAuto from '../models/tempOperationAutoModel.js';

const tempOperationAutoRouter = express.Router();


tempOperationAutoRouter.post(
  '/temp_opteration_auto',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const temp_operation_auto = new tempOperationAuto({
     "date": req.body.date,
     "type": req.body.type,
     "kind": req.body.kind,
     "str_num": req.body.str_num,
     "sum": req.body.sum,
     "imei": req.body.imei
    });
    const createdTempOperationAuto = await temp_operation_auto.save();
    res.send({ message: 'Temp Auto Operation Created', temp_operation_auto: createdTempOperationAuto });
  })
);



export default tempOperationAutoRouter;
