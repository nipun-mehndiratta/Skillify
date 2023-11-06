import { number, z } from 'zod';


export const userCredentials = z.object({
    username: z.string().email().max(72),
    password: z.string().max(72),
})

export const courseInput = z.object({
    title: z.string().nonempty(),
    subtitle: z.string(),
    description: z.string(),
    price: z.string().or(number()),
    imageLink: z.string(),
    videoLink: z.string(),
    published: z.boolean().optional(),
})
