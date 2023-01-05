import { Router,Request, Response } from "express";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    return res.json({ status: 'Ativo' })
    // throw new Error('Erro ao fazer essa requisição.')
})

export { router };
