import { api } from '@/lib/api'


export const loginUser = (credentials: { username: string; password: string;}) =>
    api.post('/token/', credentials)


export const refreshToken = (refresh: string) => 
    api.post('/token/refresh', { refresh})