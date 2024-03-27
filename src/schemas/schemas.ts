import { z } from 'zod'

export const createLinkSchema = z.object({
    code: z.string().min(3).optional(),
    url: z.string().url()
})

export const getLinkSchema = z.object({
    code: z.string().min(3)
})

export const customerCatalog : Record<string, string> = {
    '3d7be932-5f6a-45d0-b51e-5768db15a7b7': 'fluidstate',
    '101c11ac-a1ff-49d0-bf40-5970274612c8': 'neomot',
    '0115d671-0172-4341-b5ad-ecf09eac8e0f': 'valorizza'
}