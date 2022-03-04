import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';
import Counters from "../models/counterModel.js";
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
const userRouter = express.Router();

const getNextSequence = async (name) => {
  const filter = { uid: name }
  const update = { $inc: { seq: 1 } }
  const ret = await Counters.findOneAndUpdate(filter, update, {
    new: true
  })

  return ret.seq;
}

userRouter.get(
  '/top-sellers',
  expressAsyncHandler(async (req, res) => {
    const topSellers = await User.find({ isSeller: true })
      .sort({ 'seller.rating': -1 })
      .limit(3);
    res.send(topSellers);
  })
);

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({name: req.body.name});
    if (user) {
      if (req.body.password, user.password) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isCEO: user.isCEO,
          isSecondAdmin: user.isSecondAdmin,
          isFirstAdmin: user.isFirstAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
  '/signin-admin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ name: req.body.name });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isCEO: user.isCEO,
          isSecondAdmin: user.isSecondAdmin,
          isFirstAdmin: user.isFirstAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

// exports.create__caller_case = async (req, res) => {
//   const count = await getNextSequence('caseid')
//   try{
//       const data = req.body
//       data.caseId = count
//       cases = new Cases(data)
//       cases.save()
//       res.json({ status: 'success', data: cases })
//   } catch (error) {
//     console.log(error.message)
//     res.status(500).send('Server error')
//   }
// }

userRouter.post(
  '/register',upload.single('image'),
  expressAsyncHandler(async (req, res) => {
    const count = await getNextSequence('user');
    console.log(req.file);
    const user = new User({
      
      _id: parseInt(count),
      // image: req.file.path,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      phone: req.body.phone,
      isCEO: req.body.isCEO,
      isSecondAdmin: req.body.isSecondAdmin,
      isFirstAdmin: req.body.isFirstAdmin,
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      address: createdUser.address,
      phone: createdUser.phone,
      isCEO: createdUser.isCEO,
      isSecondAdmin: createdUser.isSecondAdmin,
      isFirstAdmin: createdUser.isFirstAdmin,
      image: createdUser.image,
      token: generateToken(createdUser),
    });
  })
);
// register first admin
userRouter.post(
  '/register-firstadmin',upload.single('image'),
  expressAsyncHandler(async (req, res) => {
    const count = await getNextSequence('user');
    console.log(req.file);
    const user = new User({
      _id: parseInt(count),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      phone: req.body.phone,
      isCEO: req.body.isCEO,
      isSecondAdmin: req.body.isSecondAdmin,
      isFirstAdmin: req.body.isFirstAdmin,
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      address: createdUser.address,
      phone: createdUser.phone,
      isCEO: createdUser.isCEO,
      isSecondAdmin: createdUser.isSecondAdmin,
      isFirstAdmin: createdUser.isFirstAdmin,
      image: createdUser.image,
      token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
userRouter.put(
  '/profile/:id',upload.single('image'),
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const UserID = req.params.id;
    const connectionUser = await User.findById(UserID);
    if (connectionUser) {
      connectionUser.image = req.file.path,
      connectionUser.name= req.body.name,
      connectionUser.email= req.body.email,
      connectionUser.password= req.body.password,
      connectionUser.address= req.body.address,
      connectionUser.phone= req.body.phone,
      connectionUser.isCEO= req.body.isCEO,
      connectionUser.isSecondAdmin= req.body.isSecondAdmin,
      connectionUser.isFirstAdmin= req.body.isFirstAdmin
      const updatedConnectionUser = await connectionUser.save();
      res.send({ message: 'User Updated', connectionuser: updatedConnectionUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
userRouter.put(
  '/profile-firstadmin/:id',upload.single('image'),
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const UserID = req.params.id;
    const connectionUser = await User.findById(UserID);
    if (connectionUser) {
      connectionUser.name= req.body.name,
      connectionUser.email= req.body.email,
      connectionUser.password= req.body.password,
      connectionUser.address= req.body.address,
      connectionUser.phone= req.body.phone,
      connectionUser.isCEO= req.body.isCEO,
      connectionUser.isSecondAdmin= req.body.isSecondAdmin,
      connectionUser.isFirstAdmin= req.body.isFirstAdmin
      const updatedConnectionUser = await connectionUser.save();
      res.send({ message: 'User Updated', connectionuser: updatedConnectionUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
// userRouter.put(
//   '/profile',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id);
//     if (user) {
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;
//       if (user.isSeller) {
//         user.seller.name = req.body.sellerName || user.seller.name;
//         user.seller.logo = req.body.sellerLogo || user.seller.logo;
//         user.seller.description =
//           req.body.sellerDescription || user.seller.description;
//       }
//       if (req.body.password) {
//         user.password = bcrypt.hashSync(req.body.password, 8);
//       }
//       const updatedUser = await user.save();
//       res.send({
//         _id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         isCEO: createdUser.isCEO,
//         isSecondAdmin: createdUser.isSecondAdmin,
//         token: generateToken(updatedUser),
//       });
//     }
//   })
// );

userRouter.get(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: 'User Deleted', user: deleteUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isSeller = Boolean(req.body.isSeller);
      user.isAdmin = Boolean(req.body.isAdmin);
      // user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

export default userRouter;
