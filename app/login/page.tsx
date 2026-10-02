'use client'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

export default function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [message,setMessage]=useState('')
  const router=useRouter()
  async function login(e:FormEvent<HTMLFormElement>) {
    e.preventDefault(); setMessage('Signing in...')
    const {error}=await createClient().auth.signInWithPassword({email,password})
    if(error){setMessage('Login failed. Check your email and password.');return}
    router.push('/admin')
  }
  return <main>
    <nav className="nav wrap"><a className="brand" href="/"><span>JEBBY</span> CARZ</a></nav>
    <section className="loginWrap"><form className="loginCard" onSubmit={login}>
      <p className="eyebrow">JEBBY CARZ</p><h1>Admin Login</h1>
      <label>Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label>
      <label>Password<input type="password" required value={password} onChange={e=>setPassword(e.target.value)}/></label>
      <button className="button primary" type="submit">Sign In</button>
      {message && <p className="status">{message}</p>}
    </form></section>
  </main>
}
