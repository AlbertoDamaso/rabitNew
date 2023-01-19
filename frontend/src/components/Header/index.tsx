import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../public/logoHeader.svg";
import styles from "./styles.module.scss";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";

export function Header(){

    const { signOut } = useContext(AuthContext);

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                    <Image src={logoImg} alt="Logo Rabit New" width={190} height={60}/>
                </Link>
           
                <nav className={styles.menuNav}>
                    <Link href='/category'>
                        Categoria
                    </Link>

                    <Link href='product'>
                        Cardapio
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color='#f1f1f1' size={24}/>
                    </button>
                </nav>
            </div>
        </header>
    )
}