import { Hono } from 'hono'

export const app = new Hono()

app.get('/', (c) => c.json({ message: 'Orchesterix API is running.' }))

app.get('/health', (c) => c.json({ status: 'ok' }))
