import { serve } from '@hono/node-server'
import { app } from './app'

const port = Number(process.env.JUDGE_PORT ?? 4001)

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`judge listening on ${info.port}`)
})
