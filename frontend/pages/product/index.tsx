/* eslint-disable @next/next/no-img-element */
import {useState, ChangeEvent, FormEvent} from "react";
import Head from "next/head";
import { FiPlus, FiUpload } from "react-icons/fi";
import { Header } from "../../components/Header";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps{
    categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps){

    const [imgUrl, setImgUrl] = useState('');
    const [image,  setImage] = useState<any>(null);
    const [categories,  setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            return;
        }

        const imageFile = e.target.files[0];

        if(!imageFile){
            return;
        }

        if(imageFile.type === 'image/jpeg' || imageFile.type === 'image/png'){
            setImage(imageFile);
            setImgUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    function handleSelect(e: any){

        setCategorySelected(e.target.value)

    }

    async function handleRegister(e:FormEvent) {
        e.preventDefault();

        try{
            const data = new FormData();

            if(name === '' || price === '' || description === '' || image === null){
                toast.warning('Preencha todos os campos!');
                return;
            }

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('file', image);
            data.append('category_id', categories[categorySelected].id);

            console.log(data);

            const apiClient = setupAPIClient(undefined);

            await apiClient.post('/product', data);

            toast.success('Produto cadastrado com sucesso!')

        }catch(err){
            console.log(err)
            toast.error('Ops erro ao cadastrar!')
        }

        setName('');
        setPrice('');
        setDescription('');
        setImage(null);
        setImgUrl('');

    }

    return(
        <>
            <Head>
                <title>RabitNew - Novo produto</title>
            </Head>
            <div>
                <Header/>

                <main className={styles.container}>
                    <h1>Novo produto</h1>

                    <form className={styles.form} onSubmit={handleRegister}>

                        <label className={styles.labelImg}>
                            <span>
                                <FiPlus size={40} color='#238f6c'/>
                            </span>

                            <input type='file' accept="image/png, image/jpeg" onChange={handleFile}/>

                            {imgUrl && (
                                <img
                                className={styles.preview}
                                src={imgUrl}
                                alt="Foto do produto"
                                width={250}
                                height={250}
                               />
                            )}
                        </label>

                        <select value={categorySelected} onChange={handleSelect}>
                            {categories.map((item, index) => {
                                return(
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>

                        <Input
                         type='text'
                         placeholder='Digite o nome do produto'
                         value={name}
                         onChange={ (e) => setName(e.target.value)}
                        />

                        <Input
                         type='text'
                         placeholder='Preço do produto'
                         value={price}
                         onChange={ (e) => setPrice(e.target.value)}
                        />

                        <textarea
                         placeholder='Descreva seu produto...'
                         value={description}
                         onChange={ (e) => setDescription(e.target.value)}
                        />

                        <Button
                         type='submit'

                        >
                            Cadatrar
                        </Button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx);

    const  response = await apiClient.get('/category');

    // console.log(response.data)
    return {
        props:{
            categoryList: response.data
        }
    }
})