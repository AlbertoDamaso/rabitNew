import { Router,Request, Response } from "express";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    return res.json({ nome: 'Rabit New' })
})

export { router };