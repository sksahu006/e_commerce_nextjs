'use server';

import { prisma } from "@/lib/prisma";
import { SignUpSchema } from "@/lib/types/validationTypes";
import { hash } from "bcryptjs";

export async function signUp(formData: FormData) {

  const result = SignUpSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    phoneNumber: formData.get('phoneNumber'),
  });

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }

  const { username, email, password, firstName, lastName, phoneNumber } = result.data;

  try {
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (existingUser) {
      return { error: { general: "Username or email already exists" } };
    }

    const passwordHash = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        firstName,
        lastName,
        phoneNumber,
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return { success: true, user: newUser };
  } catch (error) {
    console.error("Signup error:", error);
    return { error: { general: "An error occurred during signup" } };
  }
}