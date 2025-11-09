import { Hono } from 'hono'
import { auth } from './lib/better-auth';

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.on(['GET', 'POST'], '/api/*', (c) => {
  return auth(c.env).handler(c.req.raw);
});

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
