import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';
import addOperation from '../models/addModel.js';
// import textToImage from 'text-to-image';

const addOperationRouter = express.Router();


addOperationRouter.post(
  '/generate-invoice',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const add_operation = req.body;
    console.log(add_operation);
    db.invoices.insert(
      add_operation
   )
    // const createdAddOperation = await add_operation.save();
    res.send({ message: 'Invoice Generated' });
  })
);

addOperationRouter.post(
  '/add',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const add_operation = new addOperation({
     "local_date": req.body.local_date,
     "type": req.body.type,
     "kind": req.body.kind,
     "str_num": req.body.str_num,
     "opt1": req.body.opt1,
     "opt2": req.body.opt2,
     "opt3": req.body.opt3,
     "sum": req.body.sum,
     "imei": req.body.imei
    });
    const createdAddOperation = await add_operation.save();
    res.send({ message: 'Add Operation Created', add_operation: createdAddOperation });
  })
);

// addOperationRouter.get(
//   '/invoice-image',
//   expressAsyncHandler(async (req, res) => {
//     const tabbedText = await textToImage.generate(
//       '\tDonec id elit non mi porta gravida at eget metus. \n\tSed posuere consectetur est at lobortis.',
//     );
//     res.send(tabbedText);
//   })
// );
addOperationRouter.get(
  '/add',
  expressAsyncHandler(async (req, res) => {
    const add_operation = await addOperation.find();
    res.send(add_operation);
  })
);


addOperationRouter.get(
  '/add/:id',
  expressAsyncHandler(async (req, res) => {
    const add_operation = await addOperation.findById(req.params.id)
    if (add_operation) {
      res.send(add_operation);
    } else {
      res.status(404).send({ message: 'Add Opeartion Not Found' });
    }
  })
);


addOperationRouter.put(
  '/add/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const addOpeartionId = req.params.id;
    const add_operation = await addOperation.findById(addOpeartionId);
    if (add_operation) {
     add_operation.local_date = req.body.local_date,
     add_operation.type = req.body.type,
     add_operation.kind = req.body.kind,
     add_operation.str_num = req.body.str_num,
     add_operation.opt1 = req.body.opt1,
     add_operation.opt2 = req.body.opt2,
     add_operation.opt3 = req.body.opt3,
     add_operation.sum = req.body.sum,
     add_operation.imei = req.body.imei
      const updateAddOperation = await add_operation.save();
      res.send({ message: 'Add Operation Updated', updatedaddop: updateAddOperation });
    } else {
      res.status(404).send({ message: 'Add Operation Not Found' });
    }
  })
);

addOperationRouter.delete(
  '/add/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const addOpeartionId = req.params.id;
    const add_operation = await addOperation.findById(addOpeartionId);
    // const addOperationInvoice = await addOperation.findById(req.params.id);
    if (add_operation) {
      const deleteAddOperaton = await add_operation.remove();
      res.send({ message: 'Record Deleted', deleteaddoperation: deleteAddOperaton });
    } else {
      res.status(404).send({ message: 'Delete Not Found' });
    }
  })
);


// addOperationRouter.delete(
//   '/add/:id',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const add_operation = await addOperation.findById(req.params.id);
//     if (add_operation) {
//       const deleteAddOp = await add_operation.remove();
//       res.send({ message: 'Add Operation Deleted', deletedAddOperation: deleteAddOp });
//     } else {
//       res.status(404).send({ message: 'Delete Operation Not Found' });
//     }
//   })
// );

export default addOperationRouter;
