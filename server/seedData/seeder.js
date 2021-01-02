import mongoose from 'mongoose'
import dotenv from 'dotenv'
import lyspModel from '../models/lyspModel.js'
import sampleLysp from './sampleLysp.js'
import connectDB from '../config/db.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await lyspModel.deleteMany()
    await lyspModel.insertMany(sampleLysp)
    console.log('Data imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await lyspModel.deleteMany()

    console.log('Data destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
