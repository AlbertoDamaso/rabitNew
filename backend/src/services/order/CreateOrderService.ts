import prismaClient from "../../prisma";

interface OrderRequest{
    table: number;
    name: string;
}

class CreateOrderService{
    async execute({ table, name }: OrderRequest){

        const order = await prismaClient.order.create({
            data:{
                table: table,
                name: name
            },
            select:{
                id: true,
                table: true,
                name: true,
                status: true,
                draft: true
            }
        })

        return order;

    }
}

export { CreateOrderService };