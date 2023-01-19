import { useState } from "react";
import Modal from "react-modal";
import Head from "next/head";
import { FiRefreshCcw } from "react-icons/fi";
import { Header } from "../../components/Header";
import { ModalOrder } from "../../components/ModalOrder";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}
interface HomeProps{
    order: OrderProps[];
}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product:{
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string;
    }
    order:{
        id: string;
        table: string | number;
        status: boolean;
        name: string | null;
    }
}

export default function Dashboard({ order }: HomeProps){ 

    const [orderList, setOrderList] = useState(order  || []);
    const [modalItem, setModalItem] = useState<OrderItemProps[]>();
    const [modalView, setModalView] = useState(false);

    function handleCloseModal(){
        setModalView(false);
    }

    async function handleOpenModalView(id: string){

        const apiClient = setupAPIClient(undefined);

        const response = await apiClient.get('/order/detail', {
            params:{
                order_id: id,
            }
        })

        setModalItem(response.data);
        setModalView(true);

    }

    async function handleFinishOrder(id: string){
        const apiClient = setupAPIClient(undefined);
        await apiClient.put('/order/finish', {
            order_id: id,
        })

        const response = await apiClient.get('/order');

        setOrderList(response.data);
        setModalView(false);

        toast.success('Ordem de pedido concluido!');
    }

    async function handleRefreshOrders() {

        const apiClient = setupAPIClient(undefined);

        const response = await apiClient.get('/order');
        setOrderList(response.data);
    }

    Modal.setAppElement('#__next');

    return(
        <>
        <Head>
            <title> RabitNew - Painel </title>
        </Head>
        <div>
            <Header/>

            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>
                    <button onClick={handleRefreshOrders}>
                        <FiRefreshCcw size={25} color="#3fffa3"/>
                    </button>
                </div>

                <article className={styles.listOrders}>

                    {orderList.length === 0 && (
                        <span className={styles.emptyList}>
                            Nenhum pedido aberto foi encontrado...
                        </span>
                    )}

                    {orderList.map( item => (
                        <section key={item.id} className={styles.orderItem}>
                            <button onClick={ () => handleOpenModalView(item.id) }>
                                <div className={styles.tag}></div>
                                <span>Mesa {item.table}</span>
                            </button>
                        </section>
                    ))}
                </article>
            </main>

            { modalView && (
                <ModalOrder
                 isOpen={modalView}
                 onRequestClose={handleCloseModal}
                 order={modalItem || []}
                 handleFinishOrder={handleFinishOrder}
                />
            )}
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/order');

    // console.log(response.data)

    return{
        props:{
            order: response.data
        }
    }
})