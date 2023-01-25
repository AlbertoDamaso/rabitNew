import { Request, Response } from "express";
import { ListUserService } from "../../services/user/ListUserService";


class ListUserController{
   async handle(req: Request, res: Response){
    
        const listUserService = new ListUserService();

        await listUserService.execute();

        return res.send(`<h1>Servidor Ativo</h1>`);
    }
}

export { ListUserController }

