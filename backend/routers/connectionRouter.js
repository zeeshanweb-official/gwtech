import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { generateToken, isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';
import Connection from '../models/connectionModel.js';
import SecondAdmin from '../models/secondAdminModel.js';
import crypto from "crypto";
import bcrypt from 'bcryptjs';
import Counters from "../models/counterModel.js";

const connectionUserRouter = express.Router();

const getNextSequence = async (name) => {
  const filter = { auid: name }
  const update = { $inc: { adusseq: 1 } }
  const ret = await Counters.findOneAndUpdate(filter, update, {
    new: true
  })

  return ret.adusseq;
}

connectionUserRouter.post(
  '/connection/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await Connection.findOne({ key: req.body.key, password:req.body.password  });
    if (user) {
      if (req.body.password, user.password) {
        res.send({
          _id: user._id,
          key: user.key,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send('Invalid key or password');
  })
);

connectionUserRouter.post(
  '/connection',
  expressAsyncHandler(async (req, res) => {
    const count = await getNextSequence('aduser');
    console.log("new Count: " + count);
    const connection_user = new Connection({
     _id: parseInt(count),
     password: req.body.password,
     key: req.body.key,
     secondAdmin: req.body.secondAdmin,
     lockStatus: req.body.lockStatus,
     ceoStatus: req.body.ceoStatus,
    });
    const createdConnectionUser = await connection_user.save();
    res.send({
      message: 'Connection User Created', connectionuser: createdConnectionUser,
      token: generateToken(createdConnectionUser),
    });
    res.send();
  })
);

connectionUserRouter.get(
  '/connection',
  expressAsyncHandler(async (req, res) => {
    const conectionuser = await Connection.
    find().
    populate('secondAdmin');
    
    res.send(conectionuser);
  })
);


connectionUserRouter.get(
  '/filter-user',
  expressAsyncHandler(async (req, res) => {
    const connectionUser = await Connection.find().distinct("key");
    if (connectionUser) {
      res.send(connectionUser);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
connectionUserRouter.get(
  '/connection/:id',
  expressAsyncHandler(async (req, res) => {
    const connectionUser = await Connection.findById(req.params.id).populate('secondAdmin');
    if (connectionUser) {
      res.send(connectionUser)
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);


connectionUserRouter.put(
  '/connection/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const connectionUserId = req.params.id;
    const connectionUser = await Connection.findById(connectionUserId);
    if (connectionUser) {
      connectionUser.password = req.body.password,
      connectionUser.key = req.body.key
      connectionUser.secondAdmin = req.body.secondAdmin,
      connectionUser.lockStatus = req.body.lockStatus,
      connectionUser.ceoStatus = req.body.ceoStatus
      const updatedConnectionUser = await connectionUser.save();
      res.send({ message: 'User Updated', connectionuser: updatedConnectionUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

connectionUserRouter.delete(
  '/connection/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const connectionUser = await Connection.findById(req.params.id);
    if (connectionUser) {
      const deleteUser = await connectionUser.remove();
      res.send({ message: 'User Deleted', connectionuser: deleteUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

export default connectionUserRouter;
