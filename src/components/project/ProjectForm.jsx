import { useEffect } from 'react'
import { useState } from 'react'
import Input from '../form/input'
import Select from '../form/Select'
import SubmitButton from '../form/Submit'
import styles from './ProjectForm.module.css'

export default function ProjectForm({ btnText }) {

    // 1º Cria um array vazio no hook
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // 2º Faz um request na API
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }) // 3º Transforma os dados da resposta da API em JSON 
            .then((resp) => resp.json())
            //  4º Pega os dados em JSON e insere no array do hook useState()
            .then((data) => {
                setCategories(data)
            })
            .catch((err) => console.log(err))
    }, []);

    return (
        <form className={styles.form}>
            <Input type="text" text="Nome do projeto" name="name" placeholder="Insira o nome do projeto" />
            <Input type="number" text="Orçamento do projeto" name="budget" placeholder="Insira o orçamento total" />
            <Select name="category_id" text="Selecione a categoria" options={categories} />
            <SubmitButton text={btnText} />
        </form>
    )
}