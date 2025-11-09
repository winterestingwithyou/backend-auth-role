import { Hono } from 'hono'
import { auth } from './lib/better-auth';
import { cors } from 'hono/cors';

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(
	"/api/auth/*", 
	(c, next) => {
		const corsMiddleware = cors({
			origin: c.env.CORS_ORIGIN,
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
		});
		return corsMiddleware(c, next);
	}
);

app.on(['GET', 'POST'], '/api/auth/*', (c) => {
  return auth(c.env).handler(c.req.raw);
});

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
