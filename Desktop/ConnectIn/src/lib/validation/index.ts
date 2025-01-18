import * as z from 'zod'

export const SingupValidation = z.object({
    name: z.string().min(2, {message: 'Please enter a valid name'}),
    username: z.string().min(2, {message: "Please enter a valid username"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be atleast 8 characters"}),

})

export const SinginValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be atleast 8 characters"}),

})

export const PostValidation = z.object({
    caption: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(100), 
    tags: z.string(),

})