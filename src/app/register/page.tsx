'use client'
import { FormEvent, useState } from 'react'
import axios, { AxiosError } from 'axios'
const RegisterPage = () => {
  const [error, setError] = useState()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    try {
      const { data } = await axios.post('/api/auth/singup', {
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        password: formData.get('password'),
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.error)
      }
    }
  }
  return (
    <div className='h-screen w-screen'>
      {error && (
        <div className='bg-red-500 text-slate-50 p-2 mb-2'>{error} </div>
      )}
      <form
        onSubmit={handleSubmit}
        className='text-slate-100'
      >
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

export default RegisterPage
