import { neon } from "@neondatabase/serverless";

const sql: any = neon(process.env.DATABASE_URL || "");

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const id = Number(url.pathname.split("/").pop());

  if (!id) {
    return Response.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    // ✅ GET single user
    if (req.method === "GET") {
      const user = await sql`
        SELECT * FROM "user" WHERE id = ${id}
      `;

      if (user.length === 0) {
        return Response.json({ message: "User not found" }, { status: 404 });
      }

      return Response.json(user[0]);
    }

    // ✅ UPDATE user
    if (req.method === "PUT") {
      const body = await req.json();

      const result = await sql`
        UPDATE "user"
        SET name = ${body.name}, email = ${body.email}
        WHERE id = ${id}
        RETURNING *
      `;

      if (result.length === 0) {
        return Response.json({ message: "User not found" }, { status: 404 });
      }

      return Response.json(result[0]);
    }

    // ✅ DELETE user
    if (req.method === "DELETE") {
      const result = await sql`
        DELETE FROM "user"
        WHERE id = ${id}
        RETURNING *
      `;

      if (result.length === 0) {
        return Response.json({ message: "User not found" }, { status: 404 });
      }

      return Response.json({
        message: "User deleted",
        data: result[0],
      });
    }

    return new Response("Method Not Allowed", { status: 405 });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}