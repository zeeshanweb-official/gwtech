import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    _id: {type: Number},
    name: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    isCEO: { type: Boolean, default: false, required: true },
    isSecondAdmin: { type: Boolean, default: false, required: true },
    isFirstAdmin: { type: Boolean, default: false, required: true },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);
export default User;
