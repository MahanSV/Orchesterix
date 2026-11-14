import { describe, expect, test } from 'bun:test'
import { app } from '../src/app'

describe('application', () => {
  test('returns health status', async () => {
    const response = await app.request('/health')

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ status: 'ok' })
  })
})
