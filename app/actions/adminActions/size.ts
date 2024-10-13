"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sizeFormData, sizeSchema } from "@/lib/types/validationTypes";

export async function createSize(data: sizeFormData) {
  const validatedFields = sizeSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const size = await prisma.size.create({
      data: validatedFields.data,
    });
    revalidatePath("/sizes");
    return { success: true, size };
  } catch (error) {
    return { error: "Failed to create size" };
  }
}

export async function updateSize(id: string, data: sizeFormData) {
  const validatedFields = sizeSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const size = await prisma.size.update({
      where: { id },
      data: validatedFields.data,
    });
    revalidatePath("/sizes");
    return { success: true, size };
  } catch (error) {
    return { error: "Failed to update size" };
  }
}

export async function deleteSize(id: string) {
  try {
    await prisma.size.delete({
      where: { id },
    });
    revalidatePath("/sizes");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete size" };
  }
}

export async function getSizes() {
  try {
    const sizes = await prisma.size.findMany();
    return { success: true, sizes };
  } catch (error) {
    return { error: "Failed to fetch sizes" };
  }
}
