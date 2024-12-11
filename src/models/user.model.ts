import { DataTypes, Model, Sequelize } from 'sequelize';

class User extends Model {
  public id!: number;
  public email!: string;

  static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
      },
      {
        sequelize,
        tableName: 'users',
      },
    );
  }
}

export default User;

