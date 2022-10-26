import { redisGet, redisSet, redisQuit } from './../common/redis/index';
import { redisConnect } from '../common/redis/index';
import axios from 'axios'
import { Request, Response, Router } from 'express'
import metascraper from 'metascraper'
import metascraperDescription from 'metascraper-description'
import metascraperImage from 'metascraper-image'
import metascraperTitle from 'metascraper-title'

const router = Router()

router.get('/scraper', async (_req: Request, res: Response) => {
  const scraper = metascraper([metascraperDescription(), metascraperImage(), metascraperTitle()])
  const api_key = process.env.API_KEY as string
  const url = 'https://g1.globo.com/'
  const params = new URLSearchParams({
    api_key,
    url
  })

  try {
    await redisConnect()
    const scraperCache = await redisGet(url).then((data: string | null) => data)

    if (scraperCache) {
      await redisQuit()
      return res.json(JSON.parse(scraperCache))
    }

    const response = await axios.get('https://api.scraperapi.com', { params, responseType: 'arraybuffer' })
    const metatagResult = await scraper({ html: response.data, url })

    await redisSet(url, JSON.stringify(metatagResult), { 'EX': 60 })
    await redisQuit()

    return res.json(metatagResult)
  } catch (error) {
    console.log(error)
    return res.status(500)
  }
})

export default router
