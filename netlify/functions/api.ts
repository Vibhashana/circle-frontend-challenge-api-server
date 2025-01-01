import express, { Router } from 'express'
import serverless from 'serverless-http'
import booksRouter from '../../src/router/booksRouter'
import { errorHandler } from '../../src/middleware/errorHandler'
import ErrorHandler from '../../src/utils/ErrorHandler'
import cors from 'cors'

const api = express()
const router = Router()

// Middleware
api.use(cors())
api.use(express.json())

// Routes
router.use('/books', booksRouter)

// Error handling
router.use((_req, _res, next) => {
    next(new ErrorHandler('Route not found', 404))
})

api.use('/.netlify/functions/api', router)
api.use(errorHandler)

export const handler = serverless(api)
