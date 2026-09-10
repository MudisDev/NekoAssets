import express from "express";

const app = express();
//const cors = require('cors');

import cors from "cors";

const PORT = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.json({ Success: "¡Hola mundo desde NekoAssets! 🥴" });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
