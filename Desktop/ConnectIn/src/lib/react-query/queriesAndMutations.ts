import {
    useQuery,
    useMutation,
    useQueryClients,
    UseInfiniteQuery,

} from '@tanstack/react-query'
import { createUserAccount, signInAccount } from '../appwrite/api'
import { INewUser } from '@/types'
import { sign } from 'crypto'

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser ) => createUserAccount(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string;
            password: string;
        } ) => signInAccount(user),
    })
}