import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, createContext, ReactNode } from 'react';
import { api } from '../services/api';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: '',
    })

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user.name;

    //Função para percistencia
    useEffect(() =>{
        async function loadStorage(){
            //Pegar os dados salvos do user
            const storageUser = await AsyncStorage.getItem('@rabitnew');
            let hasUser: UserProps = JSON.parse(storageUser || '{}')

            //Verificar se recebemos sa informações dele.
            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                })
            }
            setLoading(false);
        }
        loadStorage();
    }, [])

    //Função para logar
    async function signIn({ email, password }: SignInProps) {

        setLoadingAuth(true);

        try{
            const response = await api.post('/session', {
                email,
                password
            })

            // console.log(response.data);

            const { id, name, token } = response.data;

            const data = {
                ...response.data
            }

            await AsyncStorage.setItem('@rabitnew', JSON.stringify(data))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                id,
                name,
                email,
                token,
            })

            setLoadingAuth(false);

        }catch(err){
            console.log('erro ao acessar', err)
            setLoadingAuth(false);
        }
    }

    async function signOut() {
        await AsyncStorage.clear()
        .then( () => {
            setUser({
                id: '',
                name: '',
                email: '',
                token: ''
            })
        })
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, loadingAuth, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}