Node.js + PostgreSQL + Prisma 

---

# ✅ 1. PostgreSQL সেটআপ (ডাটাবেস তৈরি)

প্রথমে তোমার PostgreSQL running থাকতে হবে (local বা Neon/Railway যেকোনোটা)।

Example connection string:

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

---

# ✅ 2. Node.js project তৈরি

```bash
mkdir my-prisma-app
cd my-prisma-app
npm init -y
```

---

# ✅ 3. Prisma install করা

```bash
npm install prisma@5 @prisma/client@5
```

---

# ✅ 4. Prisma init

```bash
npx prisma init
```

এতে `.env` এবং `prisma/schema.prisma` তৈরি হবে।

---

# ✅ 5. DATABASE URL সেট করা (.env ফাইলে)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

---

# ✅ 6. Prisma schema সেটআপ (model বানানো)

`prisma/schema.prisma` ফাইল:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}
```

---

# ✅ 7. Database migration চালানো

```bash
npx prisma migrate dev --name init
```

👉 এটা:

* টেবিল তৈরি করবে
* Prisma client generate করবে

---

# ✅ 8. Node.js এ Prisma ব্যবহার

`index.js`:

```js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // CREATE
  const user = await prisma.user.create({
    data: {
      name: "Ashraful",
      email: "ashraful@email.com",
    },
  });

  console.log("Created User:", user);

  // READ
  const users = await prisma.user.findMany();
  console.log("All Users:", users);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

# ✅ 9. Run server

```bash
node index.js
```

---

# 🔥 গুরুত্বপূর্ণ Prisma commands

### Schema change করলে:

```bash
npx prisma migrate dev
```

### Prisma client regenerate:

```bash
npx prisma generate
```

### DB দেখতে UI:

```bash
npx prisma studio
```

---

# 🚀 Bonus (Express.js ব্যবহার করলে)

```js
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});
```

---

# ⚡ Summary

Prisma workflow:

```
Schema → Migrate → Client Generate → Use in Node.js
```

---

