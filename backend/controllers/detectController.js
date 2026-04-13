const detectScam = require("../utils/scamLogic");

const detectController = (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const result = detectScam(text);
  res.json(result);
};

module.exports = detectController;