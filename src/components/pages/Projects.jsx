import { useLocation } from "react-router-dom"
import Container from "../layout/Container"
import Loading from "../layout/Loading"
import LinkButton from "../layout/LinkButton"
import Message from "../layout/Message"
import ProjectCard from "../project/ProjectCard"
import styles from './Projects.module.css'
import { useState, useEffect } from 'react';

export default function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)

    const location = useLocation() // Hook para conseguir acessar o history do componente NewProject
    let message = ''

    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // A resposta do GET é convertida para JSON
            }).then((resp) => resp.json())
                .then((data) => {
                    console.log(data);
                    setRemoveLoading(true);
                    // Seta os projetos em json no array vazio do useState.
                    setProjects(data);
                }).catch((err) => console.log(err))
        }, 3000)
    }, [])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message type="success" msg={message} />}
            <Container customClass="start">
                {projects.length > 0 && projects.map((project) => (
                    <ProjectCard id={project.id} name={project.name} budget={project.budget} category={project.category.name} key={project.id} />
                ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}