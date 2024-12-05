/* istanbul ignore file */
import { Sequelize } from 'sequelize-typescript';

const instances: Record<string, Sequelize> = {}; // Cache for Sequelize instances

export const initSequelize = async (
  env: 'test' | 'other' = 'other',
): Promise<Sequelize> => {
  if (instances[env]) return instances[env]; // Return cached instance

  let sequelize: Sequelize;

  if (env === 'other') {
    sequelize = new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'dev_user',
      password: process.env.DB_PASSWORD || 'dev_password',
      database: process.env.DB_NAME || 'dev_db',
      logging: false,
    });
  } else if (env === 'test') {
    sequelize = new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5433,
      username: process.env.DB_USERNAME || 'didomi_user',
      password: process.env.DB_PASSWORD || 'didomi_pwd',
      database: 'didomi_test',
      logging: false,
    });

    // Sync models with the database
    await sequelize.sync({ force: false });
  } else {
    throw new Error(`Unsupported environment: ${env}`);
  }

  instances[env] = sequelize; // Cache the instance
  return sequelize;
};

export const closeAllInstances = async () => {
  for (const [env, sequelize] of Object.entries(instances)) {
    await sequelize.close();
    delete instances[env]; // Remove from cache
  }
};
