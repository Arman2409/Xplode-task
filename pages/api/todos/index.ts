import type { NextApiRequest, NextApiResponse } from 'next';
import Task from '../../../models/Task';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "GET") {
    const tasks = await Task.findAll();
    res.json(tasks);
    return;
  };

  if (req.method == "POST") {
    
    if (!req.body.name) {
        res.status(406).json({message: "The name of task is required"});
    };
    const newTask:any = await Task.create({name: req.body.name});

    if(newTask.dataValues.id) {
      res.status(201).json({success: true});
    } else {
      res.status(400).json({success: false, message: "Unknown Error Occured"})
    }
  } else {
    res.status(406).end();
  }
};
