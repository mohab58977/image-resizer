import express, { Application, Request, Response } from 'express'
import resize from './routes/resize'
import { morganMiddleware } from './middleware/logger'
import { pageNotFound404 } from './middleware/pageNotFound404'

import path from 'path'

export const app: Application = express()
const port = process.env.PORT || 9090

app.get('/', async (req: Request, res: Response): Promise<void> => {
  const readme = path.resolve(__dirname, '../README.md')
  res.sendFile(readme)
})

//.../ logger middleware
app.use(morganMiddleware)

// Routing
app.use('/resize', resize)

app.use(pageNotFound404)

// routes will go here

app.listen(port)
console.log('Server started at http://localhost:' + port)
