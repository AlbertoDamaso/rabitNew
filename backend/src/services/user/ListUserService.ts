import prismaClient from "../../prisma";


class ListUserService{
   async execute(){

   await prismaClient.user.findMany()
      return 
   }
}

export { ListUserService }

