import mongoose, { Schema } from "mongoose";

const coinSchema = new Schema(
  {
    id: {
      type: String,
    },
    current_price: {
      type: Number,
    },
    market_cap: {
      type: Number,
    },
    price_change_percentage_24h: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Coin", coinSchema);
