import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(!req.query){
    res.status(406).json({message: "Query not set"});
  };
  console.log(req.query.id);
  
  const client = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as any),
   });
   await client.connect();
   const del = await client.query(
    `DELETE FROM "todos" 
     WHERE id = ($1)`, [req.query.id]
    );
  res.json({message: "Deleted"})
}
