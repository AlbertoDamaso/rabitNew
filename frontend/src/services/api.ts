import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';
import { signOut } from '../contexts/AuthContext';
import { NextPageContext } from 'next';

// estava assim: setupAPIClient(ctx=undefined)
export function setupAPIClient(ctx: Pick<NextPageContext, "req"> | { req: Request; } | null | undefined){
    let cookies = parseCookies(ctx);

    const api = axios.create({
<<<<<<< HEAD
        baseURL: 'https://70d8-2804-3d90-8013-e401-5c77-cd67-7669-b63c.sa.ngrok.io',
=======
        baseURL: 'https://b5fb-2804-14c-bba4-400a-8d18-82a-a98f-f27a.sa.ngrok.io',
>>>>>>> cb9fc3028fcde5af56b92c12e32ec92b1013333f
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