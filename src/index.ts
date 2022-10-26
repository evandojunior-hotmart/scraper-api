import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import scraper from './routes/scraper'
import { isAuthenticated } from './common/middlewares'

dotenv.config()
const port = process.env.PORT || 8080
const app = express()

const basePath = '/api/v1'
app.get('/hello', (req: Request, res: Response) => {
  res.send('hello world')
})

app.use(basePath, isAuthenticated)
app.use(basePath, scraper)

app.listen(port, () => console.log(`Application running on http://localhost:${port}`))