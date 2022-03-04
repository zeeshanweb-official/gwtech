import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { generateToken, isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';
import Paymentcondition from '../models/paymentConditionModel.js';
import crypto from "crypto";
import bcrypt from 'bcryptjs';

const paymentConditionRouter = express.Router();


paymentConditionRouter.post(
  '/payment-condition',
  isAuth,
  expressAsyncHandler(async (req, res) => {
  const payment_condition = new Paymentcondition({
  kind: req.body.kind,
  radio: req.body.radio,
  groupid: req.body.groupid,
  banqueid: req.body.banqueid,
  blt1_prix: req.body.blt1_prix,
  blt2_prix: req.body.blt2_prix,
  blt3_prix: req.body.blt3_prix,
  blt_per_point: req.body.blt_per_point,
  blt_limit: req.body.blt_limit,
  l3c_prix: req.body.l3c_prix,
  l3c_per_point: req.body.l3c_per_point,
  l3c_limit: req.body.l3c_limit,
  mrg_prix: req.body.mrg_prix,
  mrg_per_point: req.body.mrg_per_point,
  mrg_limit: req.body.mrg_limit,
  mgra_prix: req.body.mgra_prix,
  mgra_per_point: req.body.mgra_per_point,
  mgra_limit: req.body.mgra_limit,
  l4c1_prix: req.body.l4c1_prix,
  l4c2_prix: req.body.l4c2_prix,
  l4c1_limit: req.body.l4c1_limit,
  l4c2_limit: req.body.l4c2_limit,
  l4c3_limit: req.body.l4c3_limit,
  l4c1_per_point: req.body.l4c1_per_point,
  l4c2_per_point: req.body.l4c2_per_point,
  l4c3_per_point: req.body.l4c3_per_point,
  l5c1_prix: req.body.l5c1_prix,
  l5c2_prix: req.body.l5c2_prix,
  l5c3_prix: req.body.l5c3_prix,
  l5c1_limit: req.body.l5c1_limit,
  l5c2_limit: req.body.l5c2_limit,
  l5c3_limit: req.body.l5c3_limit,
  l5c1_per_point: req.body.l5c1_per_point,
  l5c2_per_point: req.body.l5c2_per_point,
  l5c3_per_point: req.body.l5c3_per_point,
    });
    const createdPaymentCondition = await payment_condition.save();
    res.send({
      message: 'Payment Condition Saved', paymentcondition: createdPaymentCondition,
    });
    res.send();
  })
);

paymentConditionRouter.get(
  '/payment-condition',
  expressAsyncHandler(async (req, res) => {
    const paymentCondition = await Paymentcondition.
    find()    
    res.send(paymentCondition);
  })
);



paymentConditionRouter.get(
  '/payment-condition/:id',
  expressAsyncHandler(async (req, res) => {
    const paymentcondition = await Paymentcondition.findById(req.params.id)
    if (paymentcondition) {
      res.send(paymentcondition);
    } else {
      res.status(404).send({ message: 'Payment Condition Not Found' });
    }
  })
);


paymentConditionRouter.put(
  '/payment-condition/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const PaymentConditionId = req.params.id;
    const paymentCondition = await Paymentcondition.findById(PaymentConditionId);
    if (paymentCondition) {
      paymentCondition.kind =  req.body.kind,
      paymentCondition.radio =  req.body.radio,
      paymentCondition.groupid =  req.body.groupid,
      paymentCondition.banqueid =  req.body.banqueid,
      paymentCondition.blt1_prix =  req.body.blt1_prix,
      paymentCondition.blt2_prix =  req.body.blt2_prix,
      paymentCondition.blt3_prix =  req.body.blt3_prix,
      paymentCondition.blt_per_point =  req.body.blt_per_point,
      paymentCondition.blt_limit =  req.body.blt_limit,
      paymentCondition.l3c_prix =  req.body.l3c_prix,
      paymentCondition.l3c_per_point =  req.body.l3c_per_point,
      paymentCondition.l3c_limit =  req.body.l3c_limit,
      paymentCondition.mrg_prix =  req.body.mrg_prix,
      paymentCondition.mrg_per_point =  req.body.mrg_per_point,
      paymentCondition.mrg_limit =  req.body.mrg_limit,
      paymentCondition.mgra_prix =  req.body.mgra_prix,
      paymentCondition.mgra_per_point =  req.body.mgra_per_point,
      paymentCondition.mgra_limit =  req.body.mgra_limit,
      paymentCondition.l4c1_prix =  req.body.l4c1_prix,
      paymentCondition.l4c2_prix =  req.body.l4c2_prix,
      paymentCondition.l4c1_limit =  req.body.l4c1_limit,
      paymentCondition.l4c2_limit =  req.body.l4c2_limit,
      paymentCondition.l4c3_limit =  req.body.l4c3_limit,
      paymentCondition.l4c1_per_point =  req.body.l4c1_per_point,
      paymentCondition.l4c2_per_point =  req.body.l4c2_per_point,
      paymentCondition.l4c3_per_point =  req.body.l4c3_per_point,
      paymentCondition.l5c1_prix =  req.body.l5c1_prix,
      paymentCondition.l5c2_prix =  req.body.l5c2_prix,
      paymentCondition.l5c3_prix =  req.body.l5c3_prix,
      paymentCondition.l5c1_limit =  req.body.l5c1_limit,
      paymentCondition.l5c2_limit =  req.body.l5c2_limit,
      paymentCondition.l5c3_limit =  req.body.l5c3_limit,
      paymentCondition.l5c1_per_point =  req.body.l5c1_per_point,
      paymentCondition.l5c2_per_point =  req.body.l5c2_per_point,
      paymentCondition.l5c3_per_point =  req.body.l5c3_per_point
      const updatedPaymentCondition = await paymentCondition.save();
      res.send({ message: 'Payment Condition Updated', paymentcondition: updatedPaymentCondition });
    } else {
      res.status(404).send({ message: 'Payment Condition Not Found' });
    }
  })
);

paymentConditionRouter.delete(
  '/payment-Condition/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const paymentCondition = await Paymentcondition.findById(req.params.id);
    if (paymentCondition) {
      const paymentConditionHandler = await paymentCondition.remove();
      res.send({ message: 'Condition Deleted', paymentcondition: paymentConditionHandler });
    } else {
      res.status(404).send({ message: 'Condition Not Found' });
    }
  })
);


paymentConditionRouter.put(
  '/payment-condition-new/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const PaymentConditionId = req.params.id;
    const paymentCondition = await Paymentcondition.findById(PaymentConditionId);
    if (paymentCondition) {
      paymentCondition.secondAdmin =  req.body.secondAdmin,
      paymentCondition.kind =  req.body.kind,
      paymentCondition.radio =  req.body.radio,
      paymentCondition.groupid =  req.body.groupid,
      paymentCondition.banqueid =  req.body.banqueid,
      paymentCondition.blt1_prix =  req.body.blt1_prix,
      paymentCondition.blt2_prix =  req.body.blt2_prix,
      paymentCondition.blt3_prix =  req.body.blt3_prix,
      paymentCondition.blt_per_point =  req.body.blt_per_point,
      paymentCondition.blt_limit =  req.body.blt_limit,
      paymentCondition.l3c_prix =  req.body.l3c_prix,
      paymentCondition.l3c_per_point =  req.body.l3c_per_point,
      paymentCondition.l3c_limit =  req.body.l3c_limit,
      paymentCondition.mrg_prix =  req.body.mrg_prix,
      paymentCondition.mrg_per_point =  req.body.mrg_per_point,
      paymentCondition.mrg_limit =  req.body.mrg_limit,
      paymentCondition.mgra_prix =  req.body.mgra_prix,
      paymentCondition.mgra_per_point =  req.body.mgra_per_point,
      paymentCondition.mgra_limit =  req.body.mgra_limit,
      paymentCondition.l4c1_prix =  req.body.l4c1_prix,
      paymentCondition.l4c2_prix =  req.body.l4c2_prix,
      paymentCondition.l4c1_limit =  req.body.l4c1_limit,
      paymentCondition.l4c2_limit =  req.body.l4c2_limit,
      paymentCondition.l4c3_limit =  req.body.l4c3_limit,
      paymentCondition.l4c1_per_point =  req.body.l4c1_per_point,
      paymentCondition.l4c2_per_point =  req.body.l4c2_per_point,
      paymentCondition.l4c3_per_point =  req.body.l4c3_per_point,
      paymentCondition.l5c1_prix =  req.body.l5c1_prix,
      paymentCondition.l5c2_prix =  req.body.l5c2_prix,
      paymentCondition.l5c3_prix =  req.body.l5c3_prix,
      paymentCondition.l5c1_limit =  req.body.l5c1_limit,
      paymentCondition.l5c2_limit =  req.body.l5c2_limit,
      paymentCondition.l5c3_limit =  req.body.l5c3_limit,
      paymentCondition.l5c1_per_point =  req.body.l5c1_per_point,
      paymentCondition.l5c2_per_point =  req.body.l5c2_per_point,
      paymentCondition.l5c3_per_point =  req.body.l5c3_per_point
      const updatedPaymentCondition = await paymentCondition.save();
      res.send({ message: 'Payment Condition Updated', paymentcondition: updatedPaymentCondition });
    } else {

      const payment_condition = new Paymentcondition({
        secondAdmin:  req.body.secondAdmin,
        kind: req.body.kind,
        radio: req.body.radio,
        groupid: req.body.groupid,
        banqueid: req.body.banqueid,
        blt1_prix: req.body.blt1_prix,
        blt2_prix: req.body.blt2_prix,
        blt3_prix: req.body.blt3_prix,
        blt_per_point: req.body.blt_per_point,
        blt_limit: req.body.blt_limit,
        l3c_prix: req.body.l3c_prix,
        l3c_per_point: req.body.l3c_per_point,
        l3c_limit: req.body.l3c_limit,
        mrg_prix: req.body.mrg_prix,
        mrg_per_point: req.body.mrg_per_point,
        mrg_limit: req.body.mrg_limit,
        mgra_prix: req.body.mgra_prix,
        mgra_per_point: req.body.mgra_per_point,
        mgra_limit: req.body.mgra_limit,
        l4c1_prix: req.body.l4c1_prix,
        l4c2_prix: req.body.l4c2_prix,
        l4c1_limit: req.body.l4c1_limit,
        l4c2_limit: req.body.l4c2_limit,
        l4c3_limit: req.body.l4c3_limit,
        l4c1_per_point: req.body.l4c1_per_point,
        l4c2_per_point: req.body.l4c2_per_point,
        l4c3_per_point: req.body.l4c3_per_point,
        l5c1_prix: req.body.l5c1_prix,
        l5c2_prix: req.body.l5c2_prix,
        l5c3_prix: req.body.l5c3_prix,
        l5c1_limit: req.body.l5c1_limit,
        l5c2_limit: req.body.l5c2_limit,
        l5c3_limit: req.body.l5c3_limit,
        l5c1_per_point: req.body.l5c1_per_point,
        l5c2_per_point: req.body.l5c2_per_point,
        l5c3_per_point: req.body.l5c3_per_point,
          });

          const updatedPaymentCondition = await payment_condition.save();
          res.send({ message: 'Payment Condition Saved', paymentcondition: updatedPaymentCondition });
    }
  })
);


paymentConditionRouter.get(
  '/payment-condition-new/:id',
  expressAsyncHandler(async (req, res) => {
    const paymentcondition = await Paymentcondition.find({secondAdmin: req.params.id})
    if (paymentcondition) {
      res.send(paymentcondition);
    } else {
      res.status(404).send({ message: 'Payment Condition Not Found' });
    }
  })
);



export default paymentConditionRouter;
