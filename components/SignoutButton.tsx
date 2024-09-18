'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useSetRecoilState } from 'recoil'
import { userState } from '@/stores/atoms/userStateAtom'
import { signOutAction } from '@/app/actions/signoutAction'

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const setUser = useSetRecoilState(userState)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      const result = await signOutAction()
      if (result.success) {
        setUser(null)
        router.push('/')
      } else {
        console.error('Sign out failed:', result.error)
      }
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleSignOut} disabled={isLoading}>
      {isLoading ? 'Signing out...' : 'Sign out'}
    </Button>
  )
}