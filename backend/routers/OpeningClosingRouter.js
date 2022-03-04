import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { generateToken, isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';
import OpeningClosing from '../models/OpeningClosingModel.js';
import LotteryTiming from '../models/LotteryTimingModel.js';
// import moment from 'moment'
import moment from 'moment-timezone';

const openingClosingRouter = express.Router();


openingClosingRouter.post(
  '/opening-closing-lottery',
  expressAsyncHandler(async (req, res) => {
    const openingclosing = new OpeningClosing({
     MIDIlotteryStartTime: req.body.MIDIlotteryStartTime,
     MIDIlotteryEndTime: req.body.MIDIlotteryEndTime,
     MIDIlotteryStartDate: req.body.MIDIlotteryStartDate,
     MIDIlotteryEndDate: req.body.MIDIlotteryEndDate,

     NYlotteryStartTime: req.body.NYlotteryStartTime,
     NYlotteryEndTime: req.body.NYlotteryEndTime,
     NYlotteryStartDate: req.body.NYlotteryStartDate,
     NYlotteryEndDate: req.body.NYlotteryEndDate,
    
     FLMIDIlotteryStartTime: req.body.FLMIDIlotteryStartTime,
     FLMIDIlotteryEndTime: req.body.FLMIDIlotteryEndTime,
     FLMIDIlotteryStartDate: req.body.FLMIDIlotteryStartDate,
     FLMIDIlotteryEndDate: req.body.FLMIDIlotteryEndDate,

     FLSOIRlotteryStartTime: req.body.FLSOIRlotteryStartTime,
     FLSOIRlotteryEndTime: req.body.FLSOIRlotteryEndTime,
     FLSOIRlotteryStartDate: req.body.FLSOIRlotteryStartDate,
     FLSOIRlotteryEndDate: req.body.FLSOIRlotteryEndDate,

     lotteryTimezone: req.body.lotteryTimezone
    });
    const openingClosingLottery = await openingclosing.save();
    res.send({
      message: 'Lottery Opening Closing Time', openingclosinglottery: openingClosingLottery,
    });
    res.send();
  })
);


// https://www.reddit.com/r/node/comments/m7x0ud/how_to_filter_based_on_reqquery_in_nodejs_and/
openingClosingRouter.post(
  '/lottery-timing-check',
  expressAsyncHandler(async (req, res) => {
    const lotteryStartDate = req.body.startDate;
    const lotteryEndDate = req.body.endDate;
    console.log("StartDate & Time", lotteryStartDate);
    console.log("StartDate & Time", lotteryEndDate);
    var pickCurrentTime = moment.tz("Asia/Karachi").format('YYYY-MM-DDTHH:mm:ss');
    console.log("Current Time: ", pickCurrentTime);
 
    var cnvrtCurrentTime = new Date(pickCurrentTime);
 
    var conversionInMilliseconds = cnvrtCurrentTime.getTime();
    console.log("Current Date || Time: ", conversionInMilliseconds);
 
      //Lottery Starttime Conversion
      var workWeekStartTime = lotteryStartDate;
      console.log("Fetch Workweek Start: ", workWeekStartTime);
      var myDate = new Date();
 
      var final =  moment(myDate).format('YYYY-MM-DD') + "T" + moment(workWeekStartTime).format('HH:mm:ss');
 
      console.log("Here is right conversion: ", final);
 
      var pickWorkWeekStartTime = new Date(final);
      var convrtStartTime = pickWorkWeekStartTime.getTime()
      console.log("Here is Lottery Start Time Conversion: ", convrtStartTime);
 
      //Lottery endtime Conversion
      var workWeekENdTime = lotteryEndDate;
      console.log("Fetch Workweek end: ", workWeekENdTime);
      var myDate2 = new Date();
 
      var final2 =  moment(myDate2).format('YYYY-MM-DD') + "T" + moment(workWeekENdTime).format('HH:mm:ss');
 
      console.log("Here is right conversion2: ", final2);
 
      var pickWorkWeekENdTime = new Date(final2);
      var convrtENdTime = pickWorkWeekENdTime.getTime()
      console.log("Here is Lottery ENd Time Conversion: ", convrtENdTime);
 
      // Lottery Button Enabled
        if (conversionInMilliseconds > convrtStartTime && conversionInMilliseconds < convrtENdTime) {
         res.send({
           status: true,
           message: 'Lottery Button Enabled'
         })
      }
      else{
        res.send({
          status: false,
          message: 'Lottery Button Disabled'
        })
      }
  })
 );
 

openingClosingRouter.get(
  '/opening-closing-lottery',
  expressAsyncHandler(async (req, res) => {
    const openingclosingTime = await OpeningClosing.
    find()
    
    res.send(openingclosingTime);
  })
);



openingClosingRouter.put(
  '/opening-closing-lottery/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const openingclosing = req.params.id;
    const openingclosingLottery = await OpeningClosing.findById(openingclosing);
    if (openingclosingLottery) {

     openingclosingLottery.MIDIlotteryStartTime =  req.body.MIDIlotteryStartTime,
     openingclosingLottery.MIDIlotteryEndTime =  req.body.MIDIlotteryEndTime,
     openingclosingLottery.MIDIlotteryStartDate =  req.body.MIDIlotteryStartDate,
     openingclosingLottery.MIDIlotteryEndDate =  req.body.MIDIlotteryEndDate,

     openingclosingLottery.NYlotteryStartTime =  req.body.NYlotteryStartTime,
     openingclosingLottery.NYlotteryEndTime =  req.body.NYlotteryEndTime,
     openingclosingLottery.NYlotteryStartDate =  req.body.NYlotteryStartDate,
     openingclosingLottery.NYlotteryEndDate =  req.body.NYlotteryEndDate,
    
     openingclosingLottery.FLMIDIlotteryStartTime =  req.body.FLMIDIlotteryStartTime,
     openingclosingLottery.FLMIDIlotteryEndTime =  req.body.FLMIDIlotteryEndTime,
     openingclosingLottery.FLMIDIlotteryStartDate =  req.body.FLMIDIlotteryStartDate,
     openingclosingLottery.FLMIDIlotteryEndDate =  req.body.FLMIDIlotteryEndDate,

     openingclosingLottery.FLSOIRlotteryStartTime =  req.body.FLSOIRlotteryStartTime,
     openingclosingLottery.FLSOIRlotteryEndTime =  req.body.FLSOIRlotteryEndTime,
     openingclosingLottery.FLSOIRlotteryStartDate =  req.body.FLSOIRlotteryStartDate,
     openingclosingLottery.FLSOIRlotteryEndDate =  req.body.FLSOIRlotteryEndDate,

     openingclosingLottery.lotteryTimezone =  req.body.lotteryTimezone
      const updatedOpeningClosing = await openingclosingLottery.save();
      res.send({ message: 'Opening Closing Time Updated', openingClosingLotery: updatedOpeningClosing });
    } else {
      
      const openingclosing = new OpeningClosing({
        MIDIlotteryStartTime: req.body.MIDIlotteryStartTime,
        MIDIlotteryEndTime: req.body.MIDIlotteryEndTime,
        MIDIlotteryStartDate: req.body.MIDIlotteryStartDate,
        MIDIlotteryEndDate: req.body.MIDIlotteryEndDate,
   
        NYlotteryStartTime: req.body.NYlotteryStartTime,
        NYlotteryEndTime: req.body.NYlotteryEndTime,
        NYlotteryStartDate: req.body.NYlotteryStartDate,
        NYlotteryEndDate: req.body.NYlotteryEndDate,
       
        FLMIDIlotteryStartTime: req.body.FLMIDIlotteryStartTime,
        FLMIDIlotteryEndTime: req.body.FLMIDIlotteryEndTime,
        FLMIDIlotteryStartDate: req.body.FLMIDIlotteryStartDate,
        FLMIDIlotteryEndDate: req.body.FLMIDIlotteryEndDate,
   
        FLSOIRlotteryStartTime: req.body.FLSOIRlotteryStartTime,
        FLSOIRlotteryEndTime: req.body.FLSOIRlotteryEndTime,
        FLSOIRlotteryStartDate: req.body.FLSOIRlotteryStartDate,
        FLSOIRlotteryEndDate: req.body.FLSOIRlotteryEndDate,
   
        lotteryTimezone: req.body.lotteryTimezone
       });
       const openingClosingLottery = await openingclosing.save();
       res.send({
         message: 'Lottery Opening Closing Time', openingclosinglottery: openingClosingLottery,
       });


      // res.status(404).send({ message: 'Opening Closing Time Not Found' });
    }
  })
);

export default openingClosingRouter;
