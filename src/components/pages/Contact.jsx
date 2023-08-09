import { useState } from 'react'
import emailjs from '@emailjs/browser'

import styles from './Company.module.css'

export default function Contact() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')


    function sendEmail(e) {
        e.preventDefault();

        if (name === '' || email === '' || message === '') {
            alert("Preencha todos os campos");
            return;
        }

        const templateParams = {
            from_name: name,
            message: message,
            email: email
        }

        // ID SERVIÇO | ID TEMPLATE | DADOS | API KEY
        emailjs.send('service_cgj2cp9', 'template_nom0yph', templateParams, "zTwzZMrdFxz6HKz9i")
            .then((response) => {
                //console.log("EMAIL ENVIADO", response.status, response.text)
                setName('')
                setEmail('')
                setMessage('')
            }, (err) => {
                console.log("ERRO: ", err)
            })
    }

    return (
        <div className={styles.company_container}>
            <h2>Deixe sua mensagem</h2>
            <form className={styles.company_form} onSubmit={sendEmail}>
                <input className={styles.company_input} type="text" placeholder="Digite seu nome" onChange={(e) => setName(e.target.value)} value={name} />
                <input className={styles.company_input} type="text" placeholder="Digite seu email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <textarea className={styles.company_textarea} placeholder="Digite sua mensagem" onChange={(e) => setMessage(e.target.value)} value={message}></textarea>
                <input className={styles.company_submit} type="submit" value="Enviar" />
            </form>

            <div className={styles.company_contacts}>
                <h1>Contatos: </h1>
                <p>Linkedin: <a href="https://www.linkedin.com/in/bruno-lima-b6a034177/" target="_blank" title="Linkedin">Linkedin</a></p>
                <p>Github: <a href="https://github.com/LibReact/sistema/tree/main" target="_blank" title="Github">Repositório do projeto</a></p>
            </div>
        </div>
    )
}