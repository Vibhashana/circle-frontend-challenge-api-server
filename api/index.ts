import express from 'express'
import cors from 'cors'
import ErrorHandler from '../src/utils/ErrorHandler'
import booksRouter from '../src/router/booksRouter'
import { errorHandler } from '../src/middleware/errorHandler'

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())

app.use('/api/books', booksRouter)

app.use((_req, _res, next) => {
    next(new ErrorHandler('Route not found', 404))
})

app.use(errorHandler)

// Only start the server if we're not in a Vercel environment
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`🚀 Example app listening at http://localhost:${port}`)
    })
}

// Export the app for Vercel
export default app
