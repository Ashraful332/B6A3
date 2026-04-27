import { neon } from "@neondatabase/serverless";

const sql: any = neon(process.env.DATABASE_URL || "");

export default async function handler(req: any) {
  try {
    // ✅ GET all users
    if (req.method === "GET") {
      const users = await sql`SELECT * FROM "user" ORDER BY id DESC`;
      return Response.json(users);
    }

    // ✅ CREATE user
    if (req.method === "POST") {
      const body:any = await req.json();

      if (!body.name || !body.email) {
        return Response.json(
          { message: "Name and Email required" },
          { status: 400 }
        );
      }

      const result = await sql`
        INSERT INTO "user" (name, email)
        VALUES (${body.name}, ${body.email})
        RETURNING *
      `;

      return Response.json(result[0], { status: 201 });
    }

    return new Response("Method Not Allowed", { status: 405 });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}