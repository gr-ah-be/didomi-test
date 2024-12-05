import { Sequelize } from 'sequelize-typescript';
import { initSequelize } from '../database/sequelize-instance-manager';
import { initializeModels } from '../models';

export const setup = async (): Promise<Sequelize> => {
  console.log('DB Config:', {
    // for debug purposes
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  });
  const sequelize = await initSequelize('test');
  initializeModels(sequelize);
  await sequelize.sync({ force: true }); // Force sync for a clean state
  return sequelize;
};

export const destroy = async (sequelize: Sequelize) => {
  await sequelize.truncate({ cascade: true });
};
