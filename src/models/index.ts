import { Sequelize } from 'sequelize-typescript';
import User from './user.model';
import ConsentChangeEvent from './consent-event.model';

export const initializeModels = (sequelize: Sequelize) => {
  // Initialize models with the provided Sequelize instance
  User.initialize(sequelize);
  ConsentChangeEvent.initialize(sequelize);

  // Define associations
  User.hasMany(ConsentChangeEvent, { foreignKey: 'userId', as: 'events' });
  ConsentChangeEvent.belongsTo(User, { foreignKey: 'userId', as: 'user' });
};

export { User, ConsentChangeEvent };
