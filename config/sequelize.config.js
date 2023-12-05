import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(
	process.env.DBNAME,
	process.env.DBUSER,
	process.env.DBPASSWD,
	{
		host: process.env.DBHOST,
		port: process.env.DBPORT,
		dialect: 'mysql'
	}
)

try {
    await sequelize.authenticate();
    console.log('Der er forbindelse til databasen');
  } catch (error) {
    console.error('Fejl! Kunne ikke forbinde til databasen: ', error);
  }

export default sequelize