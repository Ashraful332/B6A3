const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient({log: ["error"],});

app.use(express.json());


/* =========================
   start project
========================= */
app.get("/", async (req, res) => {
  try {
    const send = {massage:"server is ruining version 1.2"}
    res.json(send);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   CREATE USER
========================= */
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await prisma.user.create({
      data: { name, email },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   GET ALL USERS
========================= */
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   GET SINGLE USER
========================= */
app.get("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   UPDATE USER
========================= */
app.put("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: { name, email },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   DELETE USER
========================= */
app.delete("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.user.delete({
      where: { id },
    });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   SERVER START
========================= */
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});


// old working code ----

// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// async function main() {
//   // CREATE
//   const user = await prisma.user.create({
//     data: {
//       name: "Ashraful",
//       email: "ashraful@email.com",
//     },
//   });

//   console.log("Created User:", user);

//   // READ
//   const users = await prisma.user.findMany();
//   console.log("All Users:", users);
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });