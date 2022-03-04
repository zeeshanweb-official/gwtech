import mongoose from 'mongoose';

const tempOperationAutoSchema = new mongoose.Schema(
	{

    date: { 
     type: Date,
     required: true 
    },
    type: { 
    type: String, 
    required: true 
  },
  kind: { 
    type: String, 
    required: true
   },
   str_num: { 
    type: Number, 
    required: true
   },
   sum: { 
    type: Number, 
    required: true
   },
   imei: { 
    type: String, 
    required: true
   },

	},

);

const tempOperationAuto = mongoose.model('temoperationauto', tempOperationAutoSchema);
export default tempOperationAuto;

