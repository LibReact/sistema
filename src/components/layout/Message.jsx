import { useState, useEffect } from 'react'
import styles from './Message.module.css'

export default function Message({ type, msg }) {

    const [visible, setVisible] = useState(false)

    useEffect(() => {

        // Não tem mensagem, visibilidade é: false
        if (!msg) {
            setVisible(false)
            return
        }

        // Tem mensagem, visibilidade é: true
        setVisible(true)

        // Temporiza, a cada 3 segundos remove a mensagem
        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)

    }, [msg])

    return (
        <>
            {visible && (
                <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
            )}
        </>
    )
}