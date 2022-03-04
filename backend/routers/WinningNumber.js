import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { generateToken, isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';
import WinningNumberModel from '../models/WinningNumberModel.js';
import moment from 'moment';

const winningNumberRouter = express.Router();



winningNumberRouter.post(
  '/winning-number',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const winning_number = new WinningNumberModel({
     kind: req.body.kind,
     first: req.body.first,
     second: req.body.second,
     third: req.body.third,
     l3c: req.body.l3c,
     mrg1: req.body.mrg1,
     mrg2: req.body.mrg2,
     mrg3: req.body.mrg3,
     mrg4:  req.body.mrg4,
     mrg5: req.body.mrg5,
     mrg6: req.body.mrg6,
     l4c1: req.body.l4c1,
     l4c2: req.body.l4c2,
     l4c3: req.body.l4c3,
     l5c1: req.body.l5c1,
     l5c2: req.body.l5c2,
     l5c3: req.body.l5c3,
     mgra: req.body.mgra,
     date: req.body.date
    });
    const createdWinningNumber = await winning_number.save();
    res.send({
      message: 'Winning Number Created', winningnumber: createdWinningNumber,
    });
    res.send();
  })
);

winningNumberRouter.post(
  '/winning-number',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const winning_number = new WinningNumberModel({
      filterDate: req.body.filterDate,
      lotteryKind: req.body.lotteryKind,
    });
    const createdWinningNumber = await winning_number.save();
    res.send({
      message: 'Winning Number Created', winningnumber: createdWinningNumber,
    });
    res.send();
  })
);

winningNumberRouter.post(
  '/winning-number-filter',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const lottery_type = req.body.type;
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;

    const winningnumber = await WinningNumberModel.
    find();

    console.log("Here is winning number array: ", winningnumber);
    let WinningArr = [];
    WinningArr = winningnumber;
    console.log("fromDate", fromDate);
    console.log("toDate", toDate);
    const d1 = new Date(`${fromDate}`),
    d2 = new Date(`${toDate}`),
    diff = (d2-d1)/864e5,
    dateFormat = { year: "numeric",month:'numeric',day:'numeric', weekday:'long',},
    dates = Array.from(
      {length: diff+1},
      (_,i) => {
        const date = new Date() 
        date.setDate(d1.getDate()+i) 
        const [weekdayStr, dateStr] = date.toLocaleDateString('en-US',dateFormat).split(', ')
        return `${dateStr} ${weekdayStr}`
      }
    )

    console.log("Here is my date rangee: ", dates);

    let my_final_dislayArray = [];
    let myFilterDate = dates.filter((fetch_Date)=>{
       let myConvertedDate = []
       myConvertedDate = fetch_Date.split(" ")[0].replace("/","-").replace("/","-");
        console.log(`Here is my converted date ${myConvertedDate}`);
        WinningArr.filter((winning_number) => {
          console.log(`Here is my winning number  ${moment(winning_number.date).format("YYYY-MM-DD")} && ${moment(myConvertedDate).format("YYYY-MM-DD")}`);
          if(moment(winning_number.date).format("YYYY-MM-DD") == moment(myConvertedDate).format("YYYY-MM-DD") && winning_number.lottery == lottery_type){
            my_final_dislayArray.push(winning_number);
            res.send({
              winningNumber: my_final_dislayArray,
              message: 'Winning Number Filtered'
            });
          }
        })
        return;
   })

   console.log("myFilterDate", myFilterDate);
  //  if(myFilterDate.length == 0){
  //   res.send({message: "no winning number found"});
  //  }
    })
);


// winningNumberRouter.post(
//   '/winning_number_info_get',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
   
//     const winningnumber = await WinningNumberModel.
//     find()
//     res.send(winningnumber)
//   })
// );


winningNumberRouter.post(
  '/winning_number_info_get',
  expressAsyncHandler(async (req, res) => {
    const winningnumber = await WinningNumberModel.
    find({kind: req.body.kind} && {date: req.body.date})
    
    res.send(winningnumber);
  })
);

winningNumberRouter.get(
  '/winning-number',
  expressAsyncHandler(async (req, res) => {
    const winningnumber = await WinningNumberModel.
    find()
    
    res.send(winningnumber);
  })
);

winningNumberRouter.put(
  '/winning-number/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const  winningNumberId = req.params.id;
    const winningNumber = await WinningNumberModel.findById(winningNumberId);
    if (winningNumber) {
      winningNumber.kind =  req.body.kind,
      winningNumber.first =  req.body.first,
      winningNumber.second =  req.body.second,
      winningNumber.third =  req.body.third,
      winningNumber.l3c =  req.body.l3c,
      winningNumber.mrg1 =  req.body.mrg1,
      winningNumber.mrg2 =  req.body.mrg2,
      winningNumber.mrg3 =  req.body.mrg3,
      winningNumber.mrg4 =   req.body.mrg4,
      winningNumber.mrg5 =  req.body.mrg5,
      winningNumber.mrg6 =  req.body.mrg6,
      winningNumber.l4c1 =  req.body.l4c1,
      winningNumber.l4c2 =  req.body.l4c2,
      winningNumber.l4c3 =  req.body.l4c3,
      winningNumber.l5c1 =  req.body.l5c1,
      winningNumber.l5c2 =  req.body.l5c2,
      winningNumber.l5c3 =  req.body.l5c3,
      winningNumber.mgra =  req.body.mgra,
      winningNumber.date =  req.body.date
      const updatedWinningNumber = await winningNumber.save();
      res.send({ message: 'Winning Number Updated', winningnumber: updatedWinningNumber });
    } else {
      res.status(404).send({ message: 'Winning Number Not Found' });
    }
  })
);


export default winningNumberRouter;
