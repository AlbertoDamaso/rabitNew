import { FormEvent, useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/home.module.scss"

import logoImg from "../public/logo.svg"
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { canSSRGuest } from "../utils/canSSRGuest";

export default function Home() {

  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(email === '' || password === ''){
      toast.warning("Preencha todos os campos.")
      return;
    }

    setLoading(true);

    let data={
      email,
      password
    }

    await signIn(data)

    setLoading(false);
  }

  return (
    <>
    <Head>
      <title>RabitNew - Faça seu login</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Rabit New"/>
      <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <Input
            placeholder="E-mail"
            type="text"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />
          <Input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value) }            
          />

          <Button
            type="submit"
            loading={loading}
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

export const getServerSideProps = canSSRGuest(async (ctx) =>{
  return{
    props:{}
  }
})