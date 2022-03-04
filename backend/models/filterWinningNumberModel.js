import mongoose from 'mongoose';

const FilterWinningNumberSchema = new mongoose.Schema(
  {
    kind: { type: String, required: true },
    date: { type: date, required: false, unique: true },
  },
);
const FilterWinningNumer = mongoose.model('filterwinningnumber', FilterWinningNumberSchema);
export default FilterWinningNumer;
