import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { Error } from 'mongoose';
import  { JwtPayload }  from '../interfaces/jwt'

const privateKey = process.env.PRIVATE_KEY || 'SgH78/?+_01As'; // Default private key (for development only)

// Sign JWT with type annotations and error handling
export const signToken = (data: JwtPayload): string => {
  try {
    const token = jwt.sign(data, privateKey, { expiresIn: '1d' }); // Explicitly define 'expiresIn'
    return token;
  } catch (error:any) {
    throw new Error('Error signing JWT token: ' + error.message);
  }
};

// Verify JWT with type annotations and error handling
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, privateKey) as JwtPayload; // Type assertion for decoded data
    return decoded;
  } catch (error:any) {
    if (error.name === 'JsonWebTokenError') { // Handle specific JWT errors
      return null; // Indicate invalid token
    } else {
      throw new Error('Error verifying JWT token: ' + error.message); // Re-throw with informative message
    }
  }
};