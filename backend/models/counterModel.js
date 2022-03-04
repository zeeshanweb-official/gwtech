import mongoose from 'mongoose';

const CountersSchema = new mongoose.Schema({
  
 uid: {
   type: String,
   unique: true
 },
 seq: {
   type: Number,
   unique: true
 },
 auid: {
   type: String,
   unique: true
 },
 adusseq: {
   type: Number,
   unique: true
 },
 tuid: {
   type: String,
   unique: true
 },
 tuseq: {
   type: Number,
   unique: true
 }
})

const Counters = mongoose.model('counters', CountersSchema)
export default Counters;
