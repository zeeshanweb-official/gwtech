import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';
import SecondAdminUser from '../models/secondAdminUserModel.js';
import crypto from "crypto";
import bcrypt from 'bcryptjs';

const secondAdminUserRouter = express.Router();


secondAdminUserRouter.post(
  '/second-admin-user',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const admin_user = new SecondAdminUser({
     second_admin_id: req.body.second_admin_id,
     password: bcrypt.hashSync(req.body.password, 8),
     key:     "gwt"+ crypto.randomBytes(10).toString('hex'),
    });
    const createdSecondAdminUser = await admin_user.save();
    res.send({ message: 'Second Admin User Created', secondadminuser: createdSecondAdminUser });
  })
);

secondAdminUserRouter.get(
  '/second-admin-user',
  expressAsyncHandler(async (req, res) => {
    const secondadminuser = await SecondAdminUser.find();
    res.send(secondadminuser);
  })
);


secondAdminUserRouter.get(
  '/second-admin-user/:id',
  expressAsyncHandler(async (req, res) => {
    const secondAdminUser = await SecondAdminUser.findById(req.params.id)
    if (secondAdminUser) {
      res.send(secondAdminUser);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);


secondAdminUserRouter.put(
  '/second-admin-user/:id',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const secondAdminUserId = req.params.id;
    const secondAdminUser = await SecondAdminUser.findById(secondAdminUserId);
    if (secondAdminUser) {
      secondAdminUser.second_admin_id = req.body.second_admin_id,
      secondAdminUser.password = bcrypt.hashSync(req.body.password, 8),
      secondAdminUser.key = "gwt"+ crypto.randomBytes(10).toString('hex')
      const updatedSecondAdminUser = await secondAdminUser.save();
      res.send({ message: 'Second Admin User Updated', secondadminuser: updatedSecondAdminUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

secondAdminUserRouter.delete(
  '/second-admin-user/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const secondAdminUser = await SecondAdminUser.findById(req.params.id);
    if (secondAdminUser) {
      const deleteAdminUser = await secondAdminUser.remove();
      res.send({ message: 'Second Admin User Deleted', secondadminuser: deleteAdminUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

export default secondAdminUserRouter;
