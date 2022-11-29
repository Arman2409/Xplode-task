import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'path';

import queryDB from '../../../database/connection'; 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    if (req.method == "DELETE") {
        const url = parse(req.url as any);
        const del:any = await queryDB( `DELETE FROM "todos" 
        WHERE id = ($1)`, [url.name]);
        if(del.rowCount || del.rowCount == 0) {
            res.json({ success: true});
        } else {
            res.json({success: false, message: "Error"});
        }
    } else {
        res.status(405).end();
    };
};
