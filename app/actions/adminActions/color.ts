"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { colorFormData, colorSchema } from "@/lib/types/validationTypes";

export async function createColor(data: colorFormData) {
  const validatedFields = colorSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const color = await prisma.color.create({
      data: validatedFields.data,
    });
    revalidatePath("/colors");
    return { success: true, color };
  } catch (error) {
    return { error: "Failed to create color" };
  }
}

export async function updateColor(id: string, data: colorFormData) {
  const validatedFields = colorSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const color = await prisma.color.update({
      where: { id },
      data: validatedFields.data,
    });
    revalidatePath("/colors");
    return { success: true, color };
  } catch (error) {
    return { error: "Failed to update color" };
  }
}

export async function deleteColor(id: string) {
  try {
    await prisma.color.delete({
      where: { id },
    });
    revalidatePath("/colors");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete color" };
  }
}

export async function getColors() {
  try {
    const colors = await prisma.color.findMany();
    return { success: true, colors };
  } catch (error) {
    return { error: "Failed to fetch colors" };
  }
}
