'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }

    const checkCharacter = async () => {
      const { data } = await supabase
        .from('characters')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle()
      if (!data) {
        router.push('/character-create')
      }
      setChecking(false)
    }

    checkCharacter()
  }, [user, router])

  if (!user || checking) {
    return <div className="flex items-center justify-center h-screen text-2xl">Loading...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Emotion Alchemist</h1>
      <p className="text-lg text-gray-600">You are logged in and have a hero. Start your journey!</p>
    </div>
  )
}
