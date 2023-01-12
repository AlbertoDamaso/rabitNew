import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/home.module.scss"

import logoImg from "../../public/logo.svg"
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function SignUp() {
  return (
    <>
    <Head>
      <title>RabitNew - Faça seu cadastro</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Rabit New"/>
      <div className={styles.login}>
        <h1>Criando sua conta</h1>
        <form>
          <Input
            placeholder="Digite seu nome"
            type="text"
          />            
          <Input
            placeholder="Digite seu e-mail"
            type="text"
          />
          <Input
            placeholder="Sua senha"
            type="password"
          />

          <Button
            type="submit"
            loading={false}
          >
            Cadastrar
          </Button> 

        </form>
        <div className={styles.text}>
            <Link href="/">
                Já é cadastrado? Faça seu login
            </Link>
        </div>
      </div>
    </div>
    </>
  )
}
