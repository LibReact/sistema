import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import styles from './Footer.module.css'


export default function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li>
                    <FaFacebook />
                </li>
                <li>
                    <FaInstagram />
                </li>
                <li>
                    <FaLinkedin />
                </li>
            </ul>
            <p className={styles.copy_right}><span>Costs</span> &copy; 2023 made by <a href="https://www.linkedin.com/in/bruno-lima-b6a034177/" className={styles.linkedin} target="_blank" title="Linkedin">Bruno Lima</a></p>
        </footer>
    )
}