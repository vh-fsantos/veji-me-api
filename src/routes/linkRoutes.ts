import { Elysia, t } from 'elysia'
import { createShortLink, redirectToLink } from '../controllers'

const shortLinkRoutes = (app: Elysia) => {
    app.group('api/v1', (app) => 
        // Create a short link
        app.post('/links', createShortLink, {
            body: t.Object({
                code: t.Optional(t.String()),
                url: t.String()
            }),
            type: 'json'
        })
    )
    // Redirect to the link
    .get('/:code', redirectToLink)
}

export default shortLinkRoutes as any