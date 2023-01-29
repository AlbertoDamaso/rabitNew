import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';
import { signOut } from '../contexts/AuthContext';
import { NextPageContext } from 'next';

// estava assim: setupAPIClient(ctx=undefined)
export function setupAPIClient(ctx: Pick<NextPageContext, "req"> | { req: Request; } | null | undefined){
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'https://a758-2804-3d90-802d-a901-30fd-cc7b-73d-9caa.sa.ngrok.io',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error:AxiosError) => {
        if(error.response?.status === 401){
            // Qualquer erro 401(não autorizao) devemos deslogar o usuário.
            if(typeof window !== undefined){
                // Chamar a função para deslogar o usuário.
                signOut();
            }else{
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error)
   })

   return api;
}