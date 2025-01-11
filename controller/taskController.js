import Coin from "../models/coinModel.js";

async function start(req, res) {
  const { id } = req.query;
  try {
    const data = await Coin.findOne({ id }).sort({ createdAt: -1 });
    return res.status(200).json({ code: 200, status: "success", data:data });
  } catch (error) {
    return res.status(500).json({ code: 500, status: "failed" });
  }
}

async function deviation(req, res) {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: "Coin parameter is required" });
  }

  try {
    const records = await Coin.find({ id: coin })
      .sort({ updated_at: -1 })
      .limit(100);

    if (!records.length) {
      return res
        .status(404)
        .json({ error: "No records found for the requested coin" });
    }

    const prices = records.map((record) => record.current_price);
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;

    // Calculate the standard deviation
    const variance =
      prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) /
      prices.length;

    const standardDeviation = Math.sqrt(variance);

    
    return res.json({ deviation: parseFloat(standardDeviation.toFixed(2)) });
  } catch (error) {
    console.error("Error calculating deviation:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export { start, deviation };