const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const tradeSchema = new Schema(
  {
    tradeId: { type: String, required: true, unique: true },
    orderType: { type: String, required: true, enum: ['BUY', 'SELL'] },
    symbol: { type: String, required: true },
    quantity: { type: String, required: true },
    price: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('trades', tradeSchema);
