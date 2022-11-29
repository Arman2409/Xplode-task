import type { NextApiRequest, NextApiResponse } from 'next';
import {Client} from "pg";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(!req.query){
    res.status(406).json({message: "Query not set"});
  }
  const client = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as any),
  });
   await client.connect();
   const add = await client.query(
    `INSERT INTO "todos" ("name") 
    VALUES($1)`, [req.query.name]
    );
    console.log(add);
   if(add.rowCount) {
    res.status(201).json({message: "Added"});
   } else {
    res.status(400).end();
   };
}
