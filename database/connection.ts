// unused 
import { Client } from "pg";

const queryDB = async (query:string, array?:any[]) => {
    const client = new Client({
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT as any),
       });
    await client.connect();

    const action:any = await client.query(
        query, array
    );

    client.end();
    return action;
}


export default queryDB;