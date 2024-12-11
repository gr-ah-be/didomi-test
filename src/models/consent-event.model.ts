import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface ConsentChangeEventAttributes {
  id: number;
  userId: number;
  consentId: string;
  enabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ConsentChangeEventCreationAttributes
  extends Optional<ConsentChangeEventAttributes, 'id'> {}

class ConsentChangeEvent
  extends Model<
    ConsentChangeEventAttributes,
    ConsentChangeEventCreationAttributes
  >
  implements ConsentChangeEventAttributes
{
  public id!: number;
  public userId!: number;
  public consentId!: string;
  public enabled!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Static method to initialize the model dynamically
  static initialize(sequelize: Sequelize) {
    ConsentChangeEvent.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        consentId: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isIn: [['email_notifications', 'sms_notifications']], // Allowed consent IDs
          },
        },
        enabled: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize, // Pass the provided Sequelize instance
        tableName: 'consent_change_events',
      },
    );
  }
}

export default ConsentChangeEvent;
