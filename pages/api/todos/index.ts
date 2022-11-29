import type { NextApiRequest, NextApiResponse } from 'next';
import queryDB from '../../../database/connection';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "GET") {
     const get:any = await queryDB( `SELECT * FROM todos`);
     res.json(get.rows);
     return;
  };

  if (req.method == "POST") {
    if (!req.body.name) {
        res.status(406).json({message: "The name of task is required"});
    }
    const put:any = await queryDB(`INSERT INTO "todos" ("name") VALUES($1)`, [req.body.name]);
    if (put.rowCount) res.json({message: "Added"});
    else res.json({message: "Error Occured"});
  } else {
    res.status(406).end();
  }
};
