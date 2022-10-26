import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

import scraper from './routes/scraper'
import { isAuthenticated } from './common/middlewares'

dotenv.config()
const port = process.env.PORT || 8080
const app = express()

const basePath = '/api/v1'
const corsOptions = {
  origin: [
    'https://local.buildstaging.com:3333',
    'https://hotmart.com*'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/health-check', (req: Request, res: Response) => {
  res.send('hello world')
})

app.use(basePath, isAuthenticated)
app.use(basePath, scraper)

app.listen(port, () => console.log(`Application running on http://localhost:${port}`))