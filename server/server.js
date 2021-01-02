import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import lyspRoutes from './routes/lyspRoutes.js'
import { notFound, asyncErrorHandler } from './middleware/errorMiddleware.js'
import path from 'path'

dotenv.config()
connectDB()

const app = express()

app.get('/api', (req, res) => res.send([{ name: 'Api running' }]))

app.use('/api/lysp', lyspRoutes)

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, '/client/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => res.send('API Running'))
}

app.use(notFound)
app.use(asyncErrorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`Server started in ${process.env.NODE_ENV} on port ${PORT}`)
)
