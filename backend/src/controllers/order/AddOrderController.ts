import { Request, Response } from "express";
import { AddItemService } from "../../services/order/AddItemService";

class AddOrderController{
    async handle(req: Request, res: Response){

        const { order_id, product_id, amount } = req.body;

        const addItemService = new AddItemService();

        const item = await addItemService.execute({
            order_id,
            product_id,
            amount
        });

        return res.json(item);

    }
}

export { AddOrderController };