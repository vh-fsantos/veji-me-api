import { Elysia, t } from 'elysia'
import { linkRoutes } from './routes'

const app = new Elysia()

app.use(linkRoutes)
app.listen(3333)

console.log(`Veji.me is running at ${app.server?.hostname}:${app.server?.port}`)