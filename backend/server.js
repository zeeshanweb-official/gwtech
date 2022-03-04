import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import secondAdminRouter from './routers/secondAdminRouter.js';
import secondAdminUserRouter from './routers/secondAdminUserRouter.js';
import connectionUserRouter from './routers/connectionRouter.js';
import tempOperationRouter from './routers/tempOperationRouter.js';
import addOperationRouter from './routers/addRouter.js';
import tempOperationAutoRouter from './routers/tempOperatonAutoRouter.js';
import  MongoClient  from "mongodb";
import cors from "cors";
import ticketsRouter from './routers/dynamicTickets.js';
import winningNumberRouter from './routers/WinningNumber.js';
import paymentConditionRouter from './routers/paymentConditionRouter.js';
import openingClosingRouter from './routers/OpeningClosingRouter.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// let connectionString = 'mongodb+srv://gwtech:WG5Xhtp2cKAQHzwF@cluster0.9hexd.mongodb.net/gwtechDB?retryWrites=true&w=majority';
// mongoose.connect(connectionString,{ useNewUrlParser: true } ,(err, client)=>{
//   if (err) {
//     return console.log("Connection failed for some reason", err);
//   }
//   console.log("Connection established - All well");
//   // db = client.db();
// })

// mongoose.connect('mongodb+srv://gwt-tech:J1XCHRdWZW7zWlyb@cluster0.j779s.mongodb.net/gwtech?retryWrites=true&w=majority');

// mongoose.connect('mongodb+srv://gwtech:WG5Xhtp2cKAQHzwF@cluster0.9hexd.mongodb.net/gwtechDB?retryWrites=true&w=majority');
mongoose.connect('mongodb+srv://gwt-tech:J1XCHRdWZW7zWlyb@gwtech.ewo1t.mongodb.net/gwtech?retryWrites=true&w=majority');


app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/', secondAdminRouter);
app.use('/api/secondadminuser', secondAdminUserRouter);
app.use('/api/', connectionUserRouter);
app.use('/api/', tempOperationRouter);
app.use('/api/', addOperationRouter);
app.use('/api/', tempOperationAutoRouter);
app.use('/api/', ticketsRouter);
app.use('/api/', winningNumberRouter);
app.use('/api/', paymentConditionRouter);
app.use('/api/', openingClosingRouter);
// app.get('/api/secondadmin', secondAdminRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/api/config/google', (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || '');
});
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 8000;

const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const users = [];

io.on('connection', (socket) => {
  console.log('connection', socket.id);
  socket.on('disconnect', () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      console.log('Offline', user.name);
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('updateUser', user);
      }
    }
  });
  socket.on('onLogin', (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
    }
    console.log('Online', user.name);
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      io.to(admin.socketId).emit('updateUser', updatedUser);
    }
    if (updatedUser.isAdmin) {
      io.to(updatedUser.socketId).emit('listUsers', users);
    }
  });

  socket.on('onUserSelected', (user) => {
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      const existUser = users.find((x) => x._id === user._id);
      io.to(admin.socketId).emit('selectUser', existUser);
    }
  });

  socket.on('onMessage', (message) => {
    if (message.isAdmin) {
      const user = users.find((x) => x._id === message._id && x.online);
      if (user) {
        io.to(user.socketId).emit('message', message);
        user.messages.push(message);
      }
    } else {
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('message', message);
        const user = users.find((x) => x._id === message._id && x.online);
        user.messages.push(message);
      } else {
        io.to(socket.id).emit('message', {
          name: 'Admin',
          body: 'Sorry. I am not online right now',
        });
      }
    }
  });
});

httpServer.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

// app.listen(port, () => {
//   console.log(`Serve at http://localhost:${port}`);
// });
