const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const detectRoute = require("./routes/detect");
app.use("/api", detectRoute);

app.get("/", (req, res) => {
  res.send("Scam Detection API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});