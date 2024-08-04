import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import RecoveryToken from '../models/recoveryTokenModel';
import sendEmail from '../utils/email/sendEmail';
import { validationResult } from 'express-validator';
import { serialize } from 'cookie';

const clientURL = process.env.CLIENT_URL;

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, username, role } = req.body;
    const existingUser = await User.findOne({ where: { email }});
    if (existingUser) {
      return res.status(400).json({
        code: -2,
        message: 'User with this email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));
    const newUser = await User.create({ email, password: hashedPassword, username, role });

    const accessToken = jwt.sign({ id_user: newUser.id_user, username: newUser.username }, process.env.JWT_SECRET!);
    const token = serialize('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
    res.setHeader('Set-Cookie', token);

    res.status(200).json({
      code: 1,
      message: 'User registered successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred during registration',
      error: error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        code: -25,
        message: 'User does not exist'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        code: -5,
        message: 'Incorrect credentials'
      });
    }

    const accessToken = jwt.sign({ id_user: user.id_user, username: user.username }, process.env.JWT_SECRET!);
    const token = serialize('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
    res.setHeader('Set-Cookie', token);

    res.status(200).json({
      code: 1,
      message: 'Login successful',
      data: {
        user: {
          username: user.username,
          email: user.email
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred during login',
      error: error
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        code: -8,
        message: 'Email does not exist'
      });
    }

    let resetToken = crypto.randomBytes(32).toString("hex");

    await RecoveryToken.create({
      user_id: user.id_user,
      token: resetToken,
      created_at: new Date(),
    });

    const link = `${clientURL}/change-password?token=${resetToken}&id=${user.id_user}`;

    await sendEmail(
      user.email,
      "Password Reset Request",
      {
        username: user.username,
        link: link,
      },
      "email/template/requestResetPassword.handlebars"
    ).then(response => {
      console.log("Password reset email sent:", response);
      res.status(200).json({
        code: 100,
        message: 'Password reset email sent successfully',
        data: {
          token: resetToken,
          link: link
        }
      });

    }, error => {
      console.error(error);
      res.status(500).json({
        code: -80,
        message: 'Failed to send password reset email',
        data: { error }
      });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while resetting the password',
      error: error
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token, password } = req.body;
    let tokenRow = await RecoveryToken.findOne({ where: { token } });
    if (!tokenRow) {
      return res.status(404).json({
        code: -3,
        message: 'Invalid token'
      });
    }

    const user = await User.findOne({ where: { id_user: tokenRow.user_id } });
    if (!user) {
      return res.status(404).json({
        code: -10,
        message: 'User not found'
      });
    }

    user.password = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));
    await user.save();
    await RecoveryToken.destroy({
      where: {
        user_id: tokenRow.user_id
      }
    });

    const accessToken = jwt.sign({ id_user: user.id_user, username: user.username }, process.env.JWT_SECRET!);
    const tokenJwt = serialize('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
    res.setHeader('Set-Cookie', tokenJwt);

    res.status(200).json({
      code: 1,
      message: 'Password changed successfully',
      data: {
        user: {
          username: user.username,
          email: user.email
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while changing the password',
      error: error
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  const { cookies } = req;
  const jwt = cookies.token;

  const token = serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  });
  res.setHeader('Set-Cookie', token);
  res.status(200).json({
    code: 0,
    message: 'Logged out successfully',
  });
};

