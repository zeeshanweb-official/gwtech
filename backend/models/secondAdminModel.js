import mongoose from 'mongoose';

const secondAdminSchema = new mongoose.Schema(
	{
  name: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String, required: false },
  isSecondAdmin: { type: Boolean, default: false, required: true },
  isCEO: { type: Boolean, default: false, required: true },
	},

);

const SecondAdmin = mongoose.model('secondadmin', secondAdminSchema);
export default SecondAdmin;

