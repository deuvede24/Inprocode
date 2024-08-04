// src/models/userModel.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../db';

// Definición de atributos de usuario
export interface UserAttributes {  // <- Aquí añadí 'export'
  id_user: number;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'guest';
  preference?: 'original' | 'vegana' | 'vegetariana';
  location?: string;
  avatar?: string;
  created_at?: Date;
  updated_at?: Date;
}

// Definición de atributos para la creación de usuario, opcionalmente incluye todos menos 'id_user'
interface UserCreationAttributes extends Optional<UserAttributes, 'id_user'> {}

// Definición del modelo de usuario
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id_user!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: 'admin' | 'user' | 'guest';
  public preference?: 'original' | 'vegana' | 'vegetariana';
  public location?: string;
  public avatar?: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user', 'guest'),
      allowNull: false,
    },
    preference: {
      type: DataTypes.ENUM('original', 'vegana', 'vegetariana'),
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default User;

