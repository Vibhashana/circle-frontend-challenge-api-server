import express from 'express'
import booksRouter from '../src/router/booksRouter'
import { errorHandler } from '../src/middleware/errorHandler'
import ErrorHandler from '../src/utils/ErrorHandler'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/books', booksRouter)

// Test endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' })
})

app.use((_req, _res, next) => {
    next(new ErrorHandler('Route not found', 404))
})

app.use(errorHandler)

// Export for Vercel
export default app
