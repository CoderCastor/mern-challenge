import {PrismaClient} from "../generated/prisma/client.ts"
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";

config();

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

export default db;
