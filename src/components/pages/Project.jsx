import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'

export default function Project() {

    const { id } = useParams() // pega o ID do projeto pela URL
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()


    useEffect(() => {
        setTimeout(() => {

            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(resp => resp.json())
                .then((data) => {
                    setProject(data)
                }).catch(err => console.log(err))

        }, 3000)
    }, [id])


    function editPost(project) {
        setMessage('')


        // budget validation
        if (project.budget < project.cost) {
            // menssage
            setMessage('O orçamento nao pode ser menor que o custo do projeto!')
            setType('error')
            return false // stop a função para não atualizar o projeto.
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH', // altera apenas 1 dado ja existente na base.
            headers: {
                'Content-Type': 'application/json',
            },
            // mandando o projeto como texto ja que queremos atualizar o projeto.
            body: JSON.stringify(project),

        }) // recebe uma resposta da requisição e transforma em json.
            .then(resp => resp.json())
            // dados em json para alterarmos
            .then((data) => {

                setProject(data);
                setShowProjectForm(false) // esconde o form depois que termina a edição.
                setMessage('Projeto Atualizado!')
                setType('success')

            }).catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }


    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar Projeto' : 'Fechar'}</button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p><span>Categoria:</span> {project.category.name}</p>
                                    <p><span>Total de Orçamento:</span> {project.budget}</p>
                                    <p><span>Total Utilizado:</span> {project.cost}</p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>{!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}</button>
                            <div className={styles.project_info}>
                                {showServiceForm && <div>formulario do serviço</div>}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            <p>Itens de serviços</p>
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

