'use server'

import { signOut } from 'next-auth/react'

export async function signOutAction() {
  try {
    await signOut({ redirect: false, callbackUrl: '/' })
    return { success: true }
  } catch (error) {
    console.error('Signout error:', error)
    return { error: 'An error occurred during sign out' }
  }
}