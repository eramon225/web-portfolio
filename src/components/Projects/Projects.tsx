import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Card, CardBody, CardText, Badge, Button, Collapse, CardHeader, ListGroup, ListGroupItem, CardImg } from 'reactstrap'

interface GithubLink {
    label: string
    url: string
}

export interface ProjectProps {
    title: string
    description: string
    technologies: string[]
    teamSize?: number
    contributions?: string[]
    diagram?: string
    githubLinks?: GithubLink[]
    id: string
};

const ProjectCard: React.FC<ProjectProps> = ({ title, description, technologies, teamSize, contributions, diagram, id }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleCollapse = (): void => { setIsOpen(!isOpen) }

    return (
        <Card className="mb-4" color='secondary' inverse>
            <CardHeader><h5>{title}</h5></CardHeader>
            <CardBody>
                <CardText>{description}</CardText>
                <div>
                    <div className="mb-3">
                        {technologies.map((tech, index) => (
                            <span
                                key={`${index}_project`}
                                style={{
                                    // mr-2 did not work here.
                                    marginRight: '0.25em'
                                }}
                            >
                                <Badge key={index} size="sm" color="info" className="text-dark">
                                    {tech}
                                </Badge>
                            </span>
                        ))}
                    </div>
                    <Collapse isOpen={isOpen}>
                        <Card style={{ border: 'none' }} color='secondary' inverse >
                            {
                                teamSize !== undefined && teamSize > 0
                                    ? (
                                        <span className='mb-3'>
                                            <Badge color='primary'>{teamSize} team members</Badge>
                                        </span>
                                    )
                                    : null
                            }
                            {
                                contributions !== undefined && contributions.length > 0
                                    ? (
                                        <div className='mb-3'>
                                            <h5>Contributions</h5>
                                            <ListGroup flush>
                                                { contributions.map((contribution, index) => (
                                                    <ListGroupItem color='dark' key={index}>{contribution}</ListGroupItem>
                                                )) }
                                            </ListGroup>
                                        </div>
                                    )
                                    : null
                            }
                            {
                                diagram !== undefined
                                    ? (
                                        <div className='text-center' style={{
                                            display: 'grid',
                                            placeItems: 'center'
                                        }}>
                                            <Card color='dark'>
                                                <CardHeader><h5>Stack Diagram</h5></CardHeader>
                                                <CardImg
                                                    src={diagram}
                                                    alt='No diagram yet for this project'
                                                />
                                            </Card>
                                        </div>
                                    )
                                    : null
                            }
                        </Card>
                    </Collapse>
                    <div className="text-center">
                        <Button
                            id={'Tooltip-' + id}
                            color='light text-dark'
                            size='sm'
                            className='m-2'
                            onClick={toggleCollapse}
                        >
                            <FontAwesomeIcon icon={ isOpen ? faChevronUp : faChevronDown } size='sm'/> See { isOpen ? 'Less' : 'More' }
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default ProjectCard
