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
    const response = await axios.get('https://api.scraperapi.com', { params, responseType: 'arraybuffer' })
    const metatag = await scraper({ html: response.data, url })

    console.log('metatag=>>', JSON.stringify(metatag));


    res.send(JSON.stringify(metatag))
  } catch (error) {
    console.log(error)
  }
})

export default router
