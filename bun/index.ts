import { neon } from '@neondatabase/serverless';

const sql:any = neon(process.env.DATABASE_URL || ' ');

async function getPgVersion() {
  const result = await sql`SELECT version()`;
  console.log(result[0]);
}

getPgVersion();