import { parse, v4 as uuidv4 } from 'uuid' // cria um ID unico e serve para renderizar as listas no react
import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

export default function Project() {

    const { id } = useParams() // pega o ID do projeto pela URL
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
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
            }).then((resp) => resp.json())
                .then((data) => {
                    setProject(data)
                    setServices(data.services)
                }).catch((err) => console.log(err))

        }, 3000)
    }, [id])



    function editPost(project) {


        // budget validation
        if (project.budget < project.cost) {

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
            .then((resp) => resp.json())
            // dados em json para alterarmos
            .then((data) => {

                setProject(data);
                setShowProjectForm(false) // esconde o form depois que termina a edição.
                setMessage('Projeto Atualizado!')
                setType('success')

            }).catch((err) => console.log(err))
    }

    // cria o serviço
    function createService(project) {
        setMessage('')

        // pega o ultimo serviço
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4() // gera um id unico para o serviço

        const lastServiceCost = lastService.cost // custo do serviço

        // novo custo     custo atual do projeto 0 + ultimo custo do servico
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //console.log(newCost); // 20 type number
        //console.log(project.budget); // 10000 type string

        // maximum value validation
        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        // se o newCost não for maior que o budget do projeto, entao o cost do projeto é atualizado.
        // add service cost to project total cost
        project.cost = newCost

        // update project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            // Envia o body para os dados serem atualizados
            body: JSON.stringify(project),

        }).then((resp) => resp.json())
            .then((data) => {
                // exibir os servicos
                setShowServiceForm(false)
            })
            .catch((err) => console.log(err))
    }

    function removeService(id, cost) {

        const servicesUpdated = project.services.filter(
            (service) => service.id !== id // remove o serviço que tem o id igual o do argumento da funcao removeService
        )

        const projectUpdated = project // project do estado do component

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then((resp) => resp.json())
            .then((data) => {
                setProject(projectUpdated)
                setServices(servicesUpdated)
                setMessage('Serviço removido com sucesso!')
                setType('success')
            })
            .catch((err) => console.log(err))
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
                                {showServiceForm && (
                                    <ServiceForm handleSubmit={createService} btnText="Adicionar Serviço" projectData={project} />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 &&
                                services.map((service) => (

                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))
                            }
                            {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

