import { app } from './app'

const port = Number(Bun.env.PORT ?? 3000)

console.log(`Server is running on http://localhost:${port}`)

export default {
  port,
  fetch: app.fetch,
}
