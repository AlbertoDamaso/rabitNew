import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/home.module.scss"

import logoImg from "../../public/logo.svg"
import { Input } from "../components/ui/Input";

export default function Home() {
  return (
    <>
    <Head>
      <title>RabitNew - Faça seu login</title>
    </Head>
    <div>
      <Image src={logoImg} alt="Logo Rabit New"/>
      <div className={styles.login}>
        <form>
          <Input
            placeholder="E-mail"
            type="text"
          />
          <Input
            placeholder="Password"
            type="password"
          />
        </form>
      </div>
    </div>
    </>
  )
}
