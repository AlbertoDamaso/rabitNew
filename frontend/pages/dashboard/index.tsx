import { useState } from "react";
import Head from "next/head";
import { FiRefreshCcw } from "react-icons/fi";
import { Header } from "../../components/Header";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";

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

export default function Dashboard({ order }: HomeProps){ 

    const [orderList, setOrderList] = useState(order  || []);

    function handleOpenModalView(id: string){
        alert("test" + id)
    }

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
                    <button>
                        <FiRefreshCcw size={25} color="#3fffa3"/>
                    </button>
                </div>

                <article className={styles.listOrders}>

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