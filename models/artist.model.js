import sequelize from '../config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'


class ArtistModel extends Model {}

ArtistModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Untitled'
      }
    },
    {
      sequelize,
      modelName: 'Artist', // Modellens navn
      underscored: true, // Brug underscores istedet for standarden CamelCase
      freezeTableName: true, // Brug denne hvis du vil undgå table names i flertal tabellen
    }
  );
  
  export default ArtistModel;

