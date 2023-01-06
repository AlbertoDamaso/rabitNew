import { compare } from "bcryptjs";
import prismaClient from "../../prisma";


interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({ email, password }: AuthRequest){
        
        // Verificar se o email existe.
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        if(!user){
            throw new Error("User incorrect")
        }

        //Verificar se a senha qu ele mandou está correta.
        const passwordMatch = await compare(password, user.password)
        if(!passwordMatch){
            throw new Error("Password incorrect")
        }

        //Gerar um token JWT e devolver os dados do usuario como id, name e email

        return {status: true}
    }
}

export { AuthUserService };