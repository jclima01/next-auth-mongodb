import mongoose from 'mongoose'
const { DB_URI } = process.env
if (!DB_URI) {
  throw new Error('DB_URI must be defined in your config')
}
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(DB_URI)
    if (connection.readyState === 1) {
      console.log('mongoDB connected successfully')
      return Promise.resolve(true)
    }
  } catch (error) {
    console.log(error)
    return Promise.reject(false)
  }
}
