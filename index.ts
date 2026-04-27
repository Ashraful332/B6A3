import { serve } from "bun";
import { neon } from "@neondatabase/serverless";

const sql: any = neon(process.env.DATABASE_URL || "");

// helper function
function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const method = req.method;

    try {
      // ✅ start
      if (url.pathname === "/" && method === "GET") {
        let result = {massage:"server is start version 1.0"}
        return json(result);
      }

      // ✅ GET all users
      if (url.pathname === "/users" && method === "GET") {
        const users = await sql`SELECT * FROM "user" ORDER BY id DESC`;
        return json(users);
      }

      // ✅ GET single user
      if (url.pathname.startsWith("/users/") && method === "GET") {
        const id = Number(url.pathname.split("/")[2]);

        const user = await sql`
          SELECT * FROM "user" WHERE id = ${id}
        `;

        if (user.length === 0) {
          return json({ message: "User not found" }, 404);
        }

        return json(user[0]);
      }

      // ✅ CREATE user
      if (url.pathname === "/users" && method === "POST") {
        const body :any = await req.json();

        if (!body.name || !body.email) {
          return json({ message: "Name & Email required" }, 400);
        }

        const result = await sql`
          INSERT INTO "user" (name, email)
          VALUES (${body.name}, ${body.email})
          RETURNING *
        `;

        return json(result[0], 201);
      }

      // ✅ UPDATE user
      if (url.pathname.startsWith("/users/") && method === "PUT") {
        const id = Number(url.pathname.split("/")[2]);
        const body:any = await req.json();

        const result = await sql`
          UPDATE "user"
          SET name = ${body.name}, email = ${body.email}
          WHERE id = ${id}
          RETURNING *
        `;

        if (result.length === 0) {
          return json({ message: "User not found" }, 404);
        }

        return json(result[0]);
      }

      // ✅ DELETE user
      if (url.pathname.startsWith("/users/") && method === "DELETE") {
        const id = Number(url.pathname.split("/")[2]);

        const result = await sql`
          DELETE FROM "user"
          WHERE id = ${id}
          RETURNING *
        `;

        if (result.length === 0) {
          return json({ message: "User not found" }, 404);
        }

        return json({ message: "User deleted", data: result[0] });
      }

      return json({ message: "Route not found" }, 404);

    } catch (error) {
      console.error(error);
      return json({ error: "Internal Server Error" }, 500);
    }
  },
});

console.log("🚀 Server running at http://localhost:3000");