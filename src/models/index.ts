// import User from './user.model';
// import ConsentChangeEvent from './consent-event.model';

// // Define associations
// User.hasMany(ConsentChangeEvent, {
//   foreignKey: 'userId', // Foreign key in the ConsentChangeEvent table
//   as: 'events', // Alias for the association
// });

// ConsentChangeEvent.belongsTo(User, {
//   foreignKey: 'userId', // Foreign key in the ConsentChangeEvent table
//   as: 'user', // Alias for the reverse association
// });

// // Export models
// export { User, ConsentChangeEvent };

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
