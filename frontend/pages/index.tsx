import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/home.module.scss"

import logoImg from "../public/logo.svg"
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function Home() {
  return (
    <>
    <Head>
      <title>RabitNew - Faça seu login</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Rabit New"/>
      <div className={styles.login}>
        <form>
          <Input
            placeholder="E-mail"
            type="text"
          />
          <Input
            placeholder="Senha"
            type="password"
          />

          <Button
            type="submit"
            loading={false}
          >
            Entrar
          </Button> 
        </form>

        <div className={styles.text}>
          <span>
            Não possui uma conta?
          </span>
          <Link href="/signup">Crie uma contas</Link>
        </div>
      </div>
    </div>
    </>
  )
}
