export const ENV: string = process.env.NEXT_PUBLIC_ENV || 'development'

export const API = {
  development: 'http://localhost:3001',
  production: 'test',
}[ENV]
