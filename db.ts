import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    ssl: true,
    user: process.env.RENDER_DB_USER,
    password: process.env.RENDER_DB_PASS,
    host: process.env.RENDER_DB_HOST,
    database: process.env.RENDER_DB_NAME,
    port: parseInt(process.env.RENDER_DB_PORT!),
});

export default pool;