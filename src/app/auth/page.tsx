'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage(isLogin ? 'Logged in!' : 'Check your email to confirm your account.')
      if (isLogin) router.push('/')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-950">
      <div className="max-w-sm w-full bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Sign Up'}</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        />
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 w-full rounded mb-2"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 underline w-full mb-2"
        >
          {isLogin ? 'Need to create an account?' : 'Already have an account? Log in'}
        </button>
        {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
      </div>
    </div>
  )
}
