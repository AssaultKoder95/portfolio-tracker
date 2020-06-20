const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const portfolioSchema = new Schema(
  {
    symbol: { type: String, required: true },
    quantity: { type: String, required: true },
    price: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('portfolio', portfolioSchema);
