import type { NextApiRequest, NextApiResponse } from 'next';
import {Client, Connection} from "pg";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const client = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as any),
   });
   await client.connect();
   const get = await client.query(
    `SELECT * FROM todos`
    );
    console.log(get.rows);
   if(get.rows) {
    res.json(get.rows);
   } else {
    res.status(400).end();
   };
}
