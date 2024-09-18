'use server'

import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';


export async function signUp(username: string, email: string, password: string) {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email }
        ]
      }
    });

    if (existingUser) {
      return { error: 'Username or email already exists' };
    }

    const passwordHash = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });

    return { success: true, user: { id: newUser.id, username: newUser.username, email: newUser.email } };
  } catch (error) {
    console.error('Signup error:', error);
    return { error: 'An error occurred during signup' };
  }
}