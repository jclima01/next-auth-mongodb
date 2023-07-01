import { NextResponse } from 'next/server'
import User from '@/models/user'
import { connectDB } from '@/libs/mongodb'
import bcrypt from 'bcryptjs'
export const POST = async (request: Request) => {
  const { fullname, email, password } = await request.json()
  if (!password || password.length < 6)
    return NextResponse.json({ message: 'singup!' }, { status: 400 })
  try {
    await connectDB()
    const userFound = await User.findOne({ email })
    if (userFound)
      return NextResponse.json(
        { message: 'Email already exists!' },
        { status: 409 }
      )
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = new User({
      email,
      fullname,
      password: hashedPassword,
    })
    const savedUser = await newUser.save()
    return NextResponse.json({
      fullname: savedUser.fullname,
      email: savedUser.email,
    })
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      )
    }
  }
}
