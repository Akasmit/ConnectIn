import * as z from 'zod'

export const SingupValidation = z.object({
    name: z.string().min(2, {message: 'Please enter a valid name'}),
    username: z.string().min(2, {message: "Please enter a valid username"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be atleast 8 characters"}),

})