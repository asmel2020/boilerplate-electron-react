import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSQL({
  url: "https://kiki-scrape-waas.aws-us-west-2.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTgzOTkwNzIsImlkIjoiYWUzODYyZTUtMzk5My00NTAyLWE2ODEtMTU1ZTdjOGM3ZmY4IiwicmlkIjoiOTI2N2IzZTYtYmY4ZC00MDBiLTljYTctMWI4MzQyN2QyM2ZjIn0.1YN4aR5ISxX0WcmbNKoDw2TYMObwz-UcbewAp-0t6NlrUmH_ec8M3f-jYr50jCOCZp6XT726lj2QSKDK7d26Bw",
});

const prisma = new PrismaClient({ adapter });

async function initPrisma() {
  await prisma.$connect();
  console.log("✅ Prisma conectado a Turso");
}

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

export { initPrisma, prisma };
