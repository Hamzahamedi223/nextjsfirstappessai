import { defineConfig } from "drizzle-kit";

/** @type { import("drizzle-kit").Config } */
export default defineConfig({
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://prot1_owner:dFkPa0pT9RIV@ep-green-forest-a5a7175p.us-east-2.aws.neon.tech/prot1?sslmode=require'
    }
});
