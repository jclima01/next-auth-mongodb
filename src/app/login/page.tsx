'use client'
import { FormEvent } from 'react'
import axios from 'axios'
const LoginPage = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    try {
      const { data } = await axios.post('/api/auth/singup', {
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        password: formData.get('password'),
      })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='h-screen w-screen'>
      <form onSubmit={handleSubmit} className='text-slate-100'>
        <input
          type='text'
          placeholder='fullname'
          name='fullname'
          className='bg-zinc-800 px-4 py-2 block mb-2'
        />
        <input
          type='email'
          placeholder='email'
          name='email'
          className='bg-zinc-800 px-4 py-2 block mb-2'
        />
        <input
          type='password'
          placeholder='**********'
          name='password'
          className='bg-zinc-800 px-4 py-2 block mb-2'
        />
        <button className='bg-indigo-400 px-4 py-2'>Register</button>
      </form>
    </div>
  )
}

export default LoginPage
