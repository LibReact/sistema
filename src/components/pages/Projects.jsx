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
    const [projectMessage, setProjectMessage] = useState('')

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


    function removeProject(id) {

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
            .then(data => {
                // percorre cada projeto de dentro do array com o filter e DELETA o project pelo id passado na url da API de projetos.
                setProjects(projects.filter((project) => project.id !== id))

                // message
                setProjectMessage('Projeto removido com sucesso!')
            })
            .catch(err => console.log(err))
    }


    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {
                // Flash menssages
                // success: exibe via redirect
                // delete: exibe via state
            }
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}

            <Container customClass="start">
                {projects.length > 0 && projects.map((project) => (
                    <ProjectCard id={project.id} name={project.name} budget={project.budget} category={project.category.name} key={project.id} handleRemove={removeProject} />
                ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}