import mongoose from 'mongoose';

const WinningNumberSchema = new mongoose.Schema(
	{
  kind: { type: String, required: true },
  first: { type: String, required: true },
  second: { type:String, required: true},
  third: { type:String, required: true},
  l3c: { type:String, required: true},
  mrg1: { type:String, required: true},
  mrg2: { type:String, required: true},
  mrg3: { type:String, required: true},
  mrg4: { type:String, required: true},
  mrg5: { type:String, required: true},
  mrg6: { type:String, required: true},
  l4c1: { type:String, required: true},
  l4c2: { type:String, required: true},
  l4c3: { type:String, required: true},
  l5c1: { type:String, required: true},
  l5c2: { type:String, required: true},
  l5c3: { type:String, required: true},
  mgra: { type:String, required: true},
  date: { type:Date, required: true},
  lotteryKind: { type: String, required: false },
  filterDate: { type: Date, required: false},
	},

);


const WinningNumber = mongoose.model('winningnumber', WinningNumberSchema);
export default WinningNumber;

