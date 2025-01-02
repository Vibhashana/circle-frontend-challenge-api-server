import express from 'express'
import booksRouter from '../src/router/booksRouter'
import { errorHandler } from '../src/middleware/errorHandler'
import ErrorHandler from '../src/utils/ErrorHandler'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

// Base routes
app.use('/api/books', booksRouter)

// Test route
app.get('/api', (req, res) => {
    res.json({ status: 'API is running' })
})

app.use((_req, _res, next) => {
    next(new ErrorHandler('Route not found', 404))
})

app.use(errorHandler)

export default app
