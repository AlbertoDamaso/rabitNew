import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import path from "path";
import { router } from "./routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3333

app.use(express.json());

app.use(cors());

app.use(router);

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        //Se for uma instancia do tipo error
        return res.status(404).json({
            error:err.message
        })

    }


    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

app.listen(PORT, () => console.log('Servidor Ativo!!!'))