import { Sequelize } from "sequelize";

const sequelize = new Sequelize(`postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

if(sequelize) {
    console.log(`Database connected to port ${process.env.DB_PORT}`);
};

export default sequelize;
