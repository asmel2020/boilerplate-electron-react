require("dotenv").config();

import type { Config } from "drizzle-kit";

export default {
  schema: "./electron/db/schema.ts",
  out: "./migrations",
  dialect: "turso",
  dbCredentials: {
    url: "libsql://kiki-scrape-waas.aws-us-west-2.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTg0MjQyOTMsImlkIjoiYWUzODYyZTUtMzk5My00NTAyLWE2ODEtMTU1ZTdjOGM3ZmY4IiwicmlkIjoiOTI2N2IzZTYtYmY4ZC00MDBiLTljYTctMWI4MzQyN2QyM2ZjIn0.I4s43dTq6568NnQc7igKVlYxwtYlvug5J-zmKs9j2Vs0kMjQ745KoqFIgdyZsXzoP37sCZZY0yZ-GKHuYieMDA",
  },
} satisfies Config;
