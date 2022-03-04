import mongoose from 'mongoose';

const PaymentConditionSchema = new mongoose.Schema(
	{
  secondAdmin: { type:Number, ref: 'User'},
  kind: { type: String, required: true },
  radio: { type: String, required: false },
  groupid: { type:String, required: false},
  banqueid: { type:String, required: false},
  blt1_prix: { type:Number, required: true},
  blt2_prix: { type:Number, required: true},
  blt3_prix: { type:Number, required: true},
  blt_per_point: { type:Number, required: true},
  blt_limit: { type:Number, required: true},
  l3c_prix: { type:Number, required: true},
  l3c_per_point: { type:Number, required: true},
  l3c_limit: { type:Number, required: true},
  mrg_prix: { type:Number, required: true},
  mrg_per_point: { type:Number, required: true},
  mrg_limit: { type:Number, required: true},
  mgra_prix: { type:Number, required: true},
  mgra_per_point: { type:Number, required: true},
  mgra_limit: { type:Number, required: true},
  l4c1_prix: { type:Number, required: true},
  l4c2_prix: { type: Number, required: false },
  l4c1_limit: { type: Number, required: false},
  l4c2_limit: { type: Number, required: false},
  l4c3_limit: { type: Number, required: false},
  l4c1_per_point: { type: Number, required: false},
  l4c2_per_point: { type: Number, required: false},
  l4c3_per_point: { type: Number, required: false},
  l5c1_prix: { type: Number, required: false},
  l5c2_prix: { type: Number, required: false},
  l5c3_prix: { type: Number, required: false},
  l5c1_limit: { type: Number, required: false},
  l5c2_limit: { type: Number, required: false},
  l5c3_limit: { type: Number, required: false},
  l5c1_per_point: { type: Number, required: false},
  l5c2_per_point: { type: Number, required: false},
  l5c3_per_point: { type: Number, required: false},
	},

);


const PaymentCondition = mongoose.model('paymentcondition', PaymentConditionSchema);
export default PaymentCondition;

