import mongoose from 'mongoose';

const OpeningClosingSchema = new mongoose.Schema(
	{
   MIDIlotteryStartTime: {type: String, required: true},
   MIDIlotteryEndTime: {type: String, required: true},
   MIDIlotteryStartDate: {type: Date, required: true},
   MIDIlotteryEndDate: {type: Date, required: true},

   NYlotteryStartTime: {type: String, required: true},
   NYlotteryEndTime: {type: String, required: true},
   NYlotteryStartDate: {type: Date, required: true},
   NYlotteryEndDate: {type: Date, required: true},

   FLMIDIlotteryStartTime: {type: String, required: true},
   FLMIDIlotteryEndTime: {type: String, required: true},
   FLMIDIlotteryStartDate: {type: Date, required: true},
   FLMIDIlotteryEndDate: {type: Date, required: true},

   FLSOIRlotteryStartTime: {type: String, required: true},
   FLSOIRlotteryEndTime: {type: String, required: true},
   FLSOIRlotteryStartDate: {type: Date, required: true},
   FLSOIRlotteryEndDate: {type: Date, required: true},

   
   lotteryTimezone: {type: String, required: true}
	},

);

const OpeningClosingTime = mongoose.model('openingclosingtime', OpeningClosingSchema);
export default OpeningClosingTime;

