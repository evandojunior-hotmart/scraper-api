import { createClient } from 'redis'

const client = createClient()

client.on('error', (err) => console.log('Redis Client Error', err));


export const redisConnect = async () => {
  return client.connect()
}

export const redisQuit = async () => {
  return client.quit()
}

export const redisSet = async (key: string, value: string, options = {}) => {
  return client.set(key, value, options)
}

export const redisGet = async (key: string) => {
  return client.get(key)
}