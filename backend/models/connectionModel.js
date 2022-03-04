import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema(
	{
  _id: {type: Number},
  key: { type: String, required: true },
  password: { type: String, required: true },
  secondAdmin: { type:Number, ref: 'User'},
  lockStatus: { type: Boolean, default: false, required: true },
  ceoStatus: { type: Boolean, default: false, required: true },
	},

);

const connection = mongoose.model('connection', connectionSchema);
export default connection;

