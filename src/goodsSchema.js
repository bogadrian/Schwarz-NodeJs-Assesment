const mongoose = require('mongoose');

// Mongoose Model Schema declaration
const goodsSchema = new mongoose.Schema({
  orderId: { type: String, required: [true, 'Must have an id'] },
  companyName: {
    type: String,
    required: [true, 'A good must belong to a company'],
    trim: true
  },
  customerAddress: {
    type: String,
    required: [true, 'A good must go to a customer address'],
    trim: true
  },
  orderdItem: {
    type: String,
    required: [true, 'A good must have a name'],
    trim: true
  }
});

// make sure to creat indexes for orderId, in order to facilitate MongoDb queries - use this only if db-file.txt will be huge
goodsSchema.index({ orderId: 1 }, { unique: true });

// make sure to creat indexes for orderItem also, in order to facilitate MongoDb queries - use this only if db-file.txt will be huge / not unique of course
goodsSchema.index({ orderdItem: 1 });

const Good = mongoose.model('Good', goodsSchema);
module.exports = Good;
