// src/utils/utils.ts

// Validar si un número es par
export const esPar = (n: number): boolean => {
    return n % 2 === 0;
  };
  
  // Validar si las contraseñas coinciden
  export const validatePassword = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
  };
  
  // Declaración global para la propiedad 'user' en Express.Request
  import { UserAttributes } from '../models/userModel';  // Aquí
  
  declare global {
    namespace Express {
      interface Request {
        user?: UserAttributes;
      }
    }
  }
  