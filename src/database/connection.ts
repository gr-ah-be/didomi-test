import { logger } from '../config/logger';
import { User, ConsentChangeEvent, initializeModels } from '../models';

import { initSequelize } from './sequelize-instance-manager';

(async () => {
  try {
    const sequelize = await initSequelize();
    initializeModels(sequelize);
    await sequelize.sync(); // Sync models with the development database
    await User.sync({});
    await ConsentChangeEvent.sync({});
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1);
  }
})();
