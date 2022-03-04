import mongoose from 'mongoose';

const secondAdminUserSchema = new mongoose.Schema(
	{
  second_admin_id: { type: mongoose.Schema.Types.ObjectID, required: true },
  key: { type: String, required: true },
  password: { type: String, required: true },
	},

);

const SecondAdminUser = mongoose.model('secondadminuser', secondAdminUserSchema);
export default SecondAdminUser;

