import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";


//Função para páginas que só users logados podem ter acesso.
export function canSSRAuth<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>|undefined> => {
        const cookies = parseCookies(ctx);

        const token = cookies['@nextauth.token'];

        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            };
        }

        try {
            return await fn(ctx);
        } catch (err) {
            if (err instanceof AuthTokenError) {
                destroyCookie(ctx, '@nextauth.token');

                return {
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                };
            }
        }
    }
}
