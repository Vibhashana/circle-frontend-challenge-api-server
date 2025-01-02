import express from 'express'
import booksRouter from './router/booksRouter'
import { errorHandler } from './middleware/errorHandler'
import ErrorHandler from './utils/ErrorHandler'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/books', booksRouter)

app.use((_req, _res, next) => {
    next(new ErrorHandler('Route not found', 404))
})

app.use(errorHandler)

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(8000, () => {
        console.log(`🚀 Server listening at http://localhost:8000`)
    })
}

// Export for Vercel
export default app
