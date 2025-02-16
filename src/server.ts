import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (req, res) => res.send("Servidor rodando com TypeScript e Node 22 LTS!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
