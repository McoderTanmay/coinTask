import mongoose from "mongoose";
import Coin from "../models/coinModel.js";
import fetch from "node-fetch";

async function CreateAndUpdate() {
  try {
    const apiKey = process.env.API_KEY;
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,matic-network,ethereum`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": apiKey,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!data || !Array.isArray(data)) {
      console.error("Invalid API response");
      return;
    }

    for (const coin of data) {
      const { id, current_price, market_cap, price_change_percentage_24h } =
        coin;

      await Coin.create({
        id,
        current_price,
        market_cap,
        price_change_percentage_24h,
      });
    }

    console.log("Coin data updated successfully!");
  } catch (error) {
    console.error("Error updating coin data:", error.message);
  }
}

export {CreateAndUpdate};

// cron.schedule("*/2 * * * *", () => {
//   console.log("Running scheduled job...");
//   CreateAndUpdate();
// });
