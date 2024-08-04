import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('S8', 'tu_usuario', 'tu_contraseña', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
