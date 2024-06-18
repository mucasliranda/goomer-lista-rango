import dotenv from 'dotenv'

dotenv.config()


export const env = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV?.trim() || 'development',
}