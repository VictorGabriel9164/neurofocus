const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// cadastro do monstro

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: { name, email, password }
    });

    res.json(user);
  } catch {
    res.status(400).json({ error: "email já existe" });
  }
});

// login de cria

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "login inválido" });
  }

  res.json(user);
});


app.listen(3000, () => console.log("rodando na 3000"));