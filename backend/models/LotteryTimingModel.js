import mongoose from 'mongoose';

const LotteryTimingModelSchema = new mongoose.Schema(
	{
  startDate: { type: Date, required: false},
  endDate: { type: Date, required: false},
  status: { type: Boolean, required: false},
	},

);


const LotteryTiming = mongoose.model('lotterytiming', LotteryTimingModelSchema);
export default LotteryTiming;

