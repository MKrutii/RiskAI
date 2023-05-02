export const ENV: string = process.env.NEXT_PUBLIC_ENV || 'development'

export const API = {
  development: 'http://127.0.0.1:3001',
  production: 'https://risk-wiz-server.vercel.app',
}[ENV]
