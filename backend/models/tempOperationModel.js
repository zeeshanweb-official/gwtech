import mongoose from 'mongoose';

const tempOperationSchema = new mongoose.Schema(
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
    type: String, 
    required: true
   },
   opt1: { 
    type: String, 
    required: true
   },
   opt2: { 
    type: String, 
    required: true
   },
   opt3: { 
    type: String, 
    required: true
   },
   sum: { 
    type: String, 
    required: true
   },
   imei: { 
    type: String, 
    required: true
   },

	},

);

const tempOperation = mongoose.model('temoperation', tempOperationSchema);
export default tempOperation;

