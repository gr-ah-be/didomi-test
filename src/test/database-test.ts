import { Sequelize } from 'sequelize-typescript';
import { initSequelize } from '../database/sequelize-instance-manager';
import { initializeModels } from '../models';

export const setup = async (): Promise<Sequelize> => {
  const sequelize = await initSequelize('test');
  initializeModels(sequelize);
  await sequelize.sync({ force: true }); // Force sync for a clean state
  return sequelize;
};

export const destroy = async (sequelize: Sequelize) => {
  await sequelize.truncate({ cascade: true });
};
