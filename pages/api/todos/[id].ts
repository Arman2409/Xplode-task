import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'path';

import Task from '../../../models/Task';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    if (req.method == "DELETE") {
        const url = parse(req.url as any);
        const del = await Task.destroy({
            where: {id: url.name}
        });
        if(del) {
            res.json({ success: true});
        } else {
            res.json({success: false, message: "Unknown Error Occured"});
        }
    } else {
        res.status(405).end();
    };
};
