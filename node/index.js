require('dotenv').config();
const express = require('express');
const { neon } = require('@neondatabase/serverless');

const app = express();
const PORT = process.env.PORT || 3000;

// Validate DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not defined in .env file');
  process.exit(1);
}

// Create connection with retry logic
const sql = neon(process.env.DATABASE_URL, {
  connectionTimeoutMillis: 30000,
  maxRetries: 3,
});

app.get('/', async (req, res) => {
  let retries = 3;
  
  while (retries > 0) {
    try {
      const [result] = await Promise.race([
        sql`SELECT version()`,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Query timeout after 10s')), 10000)
        )
      ]);
      
      return res.json({ 
        status: 'connected',
        version: result?.version || 'No version found' 
      });
    } catch (error) {
      retries--;
      console.error(`Attempt failed, ${retries} retries left:`, error.message);
      
      if (retries === 0) {
        return res.status(500).json({ 
          error: 'Failed to connect to database after multiple attempts',
          details: error.message
        });
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 Database URL configured: ${process.env.DATABASE_URL ? 'Yes' : 'No'}`);
});