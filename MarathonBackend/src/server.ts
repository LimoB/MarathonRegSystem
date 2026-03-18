import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import db from "./drizzle/db";
import { sql } from "drizzle-orm";

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

async function startServer() {
  try {
    console.log("-----------------------------------------");
    console.log("🚀 Initializing Marathon System...");
    
    // Test Database Connection
    console.log("🔗 Connecting to PostgreSQL...");
    await db.execute(sql`SELECT 1`);
    console.log("✅ Database connection established.");

    // Start Express
    app.listen(PORT, () => {
      console.log(`🌐 Server active at: http://localhost:${PORT}`);
      console.log("-----------------------------------------");
    });
  } catch (error) {
    console.error("❌ Failed to start server:");
    console.error(error);
    process.exit(1);
  }
}

// Global Rejection Handler
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

startServer();