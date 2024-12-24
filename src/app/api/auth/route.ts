import { NextResponse } from 'next/server';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';

export async function POST(request: Request) {
  try {
    // Ensure database connection is established first
    await connectDB();

    const { action, email, username, password } = await request.json();

    if (action === 'signup') {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { message: 'User already exists' },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        username,
        password: hashedPassword,
      });

      try {
        await newUser.save();
        return NextResponse.json(
          { message: 'User created successfully' },
          { status: 201 }
        );
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error saving user:', error.message);
          return NextResponse.json(
            { message: 'Error creating user', error: error.message },
            { status: 500 }
          );
        } else {
          console.error('Unknown error:', error);
          return NextResponse.json(
            { message: 'An unknown error occurred' },
            { status: 500 }
          );
        }
      }
    } else if (action === 'login') {
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 404 }
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: 'Invalid password' },
          { status: 401 }
        );
      }

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        console.error('JWT_SECRET is not defined');
        return NextResponse.json(
          { message: 'Internal server error' },
          { status: 500 }
        );
      }

      const token = jwt.sign(
        { id: user._id },
        jwtSecret,
        { expiresIn: '1h' }
      );

      return NextResponse.json(
        { message: 'Login successful', token },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Invalid action' },
        { status: 400 }
      );
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
      return NextResponse.json(
        { message: 'An error occurred', error: error.message },
        { status: 500 }
      );
    } else {
      console.error('Unknown error:', error);
      return NextResponse.json(
        { message: 'An unknown error occurred' },
        { status: 500 }
      );
    }
  }
}
