import type { Context } from 'elysia'
import { db } from '../config/postgres'
import { createLinkSchema, getLinkSchema, customerCatalog } from '../schemas/schemas'

function generateCode() : string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    return code
}

export const createShortLink = async (context: Context) => {
    if (!context.body) {
        throw new Error('No body provided.')
    }

    const apiKey = context.headers['x-api-key']

    if (!apiKey || !(apiKey in customerCatalog)) {
        throw new Error('Customer not identified.')
    }

    const owner = customerCatalog[apiKey]

    let { code, url } = createLinkSchema.parse(context.body)

    if (!code) {
        code = generateCode()
    }

    try {
        const result = await db/*sql*/`
            INSERT INTO short_links(code, original_url, owner)
            VALUES (${code}, ${url}, ${owner})
            RETURNING id
        `

        const link = result[0]
        context.set.status = 201
        return {
            shortLinkId: link.id
        }
    }
    catch (err) {
        console.error(err)
        context.set.status = 500
        return {
            message: "Internal server error."
        }
    }
}

export const redirectToLink = async (context: Context<{ params: { code: string } }>) => {
    const { code } = getLinkSchema.parse(context.params)
    
    const result = await db/*sql*/`
        SELECT id, original_url
        FROM short_links
        WHERE short_links.code = ${code}
    `

    if (result.length === 0) {
        context.set.status = 400
        return {
            message: "Link not found."
        }
    }

    const link = result[0]

    context.set.status = 301
    context.set.redirect = link.original_url
}