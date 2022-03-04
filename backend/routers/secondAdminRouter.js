import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';
import SecondAdmin from '../models/secondAdminModel.js';
import multer from 'multer';
// define where to store the images;
const storage = multer.diskStorage({
   destination: function(req,file,cb){
     cb(null,'uploads/')
   },
   filename: function(req,file,cb){
     cb(null, file.originalname);
   }
 });
const upload = multer({ storage: storage });
// import Product from '../models/productModel.js';
// import bcrypt from 'bcryptjs';

const secondAdminRouter = express.Router();


secondAdminRouter.post(
  '/second-admin', upload.single('image'),
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log(req.file);
    const admin = new SecondAdmin({
    image: req.file.path,
     name: req.body.name,
     password: req.body.password,
     address: req.body.address,
     phone: req.body.phone,
    });
    const createdSecondAdmin = await admin.save();
    res.send({ message: 'Second Admin Created', secondadmin: createdSecondAdmin });
  })
);

secondAdminRouter.get(
  '/second-admin',
  expressAsyncHandler(async (req, res) => {
    const secondadmin = await SecondAdmin.find();
    res.send(secondadmin);
  })
);


secondAdminRouter.get(
  '/second-admin/:id',
  expressAsyncHandler(async (req, res) => {
    const secondAdmin = await SecondAdmin.findById(req.params.id).populate(
      'name',
          );
    if (secondAdmin) {
      res.send(secondAdmin);
    } else {
      res.status(404).send({ message: 'Admin Not Found' });
    }
  })
);


secondAdminRouter.put(
  '/second-admin/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const secondAdminId = req.params.id;
    const secondAdmin = await SecondAdmin.findById(secondAdminId);
    if (secondAdmin) {
      secondAdmin.name = req.body.name;
      secondAdmin.address = req.body.address;
      secondAdmin.phone = req.body.phone;
      secondAdmin.password = req.body.password
      const updatedSecondAdmin = await secondAdmin.save();
      res.send({ message: 'Second Admin Updated', secondadmin: updatedSecondAdmin });
    } else {
      res.status(404).send({ message: 'Admin Not Found' });
    }
  })
);

secondAdminRouter.delete(
  '/second-admin/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const secondAdmin = await SecondAdmin.findById(req.params.id);
    if (secondAdmin) {
      const deleteAdmin = await secondAdmin.remove();
      res.send({ message: 'Second Admin Deleted', secondadmin: deleteAdmin });
    } else {
      res.status(404).send({ message: 'Admin Not Found' });
    }
  })
);

export default secondAdminRouter;
