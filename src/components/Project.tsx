import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Card, CardBody, CardText, Badge, Button, Collapse, List, Tooltip, CardHeader } from 'reactstrap'

export interface ProjectProps {
    title: string
    description: string
    technologies: string[]
    teamSize?: number
    contributions?: string[]
    diagram?: string
    id: string
};

const ProjectCard: React.FC<ProjectProps> = ({ title, description, technologies, teamSize, contributions, diagram, id }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [tooltipOpen, setTooltipOpen] = useState(false)

    const toggleTooltip = (): void => { setTooltipOpen(!tooltipOpen) }
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
                                        <h5>Team Size: {teamSize}</h5>
                                    )
                                    : null
                            }
                            {
                                contributions !== undefined && contributions.length > 0
                                    ? (
                                        <React.Fragment>
                                            <h5>Contributions</h5>
                                            <List>
                                                { contributions.map((contribution, index) => (
                                                    <li key={index}>{contribution}</li>
                                                )) }
                                            </List>
                                        </React.Fragment>
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
                                            <Card color='dark' style={{ maxWidth: '90%', maxHeight: '60em' }}>
                                                <CardHeader><h5>Stack Diagram</h5></CardHeader>
                                                <img
                                                    src={diagram}
                                                    alt='No diagram yet for this project'
                                                    style={{
                                                        width: 'auto',
                                                        height: 'auto',
                                                        display: 'block'
                                                    }}
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
                            className='rounded-circle m-2'
                            onClick={toggleCollapse}
                        >
                            <FontAwesomeIcon icon={ isOpen ? faChevronUp : faChevronDown } size='sm'/>
                        </Button>
                        <Tooltip
                            placement={'right'}
                            isOpen={tooltipOpen}
                            target={'Tooltip-' + id}
                            toggle={toggleTooltip}
                        >
                            See { isOpen ? 'Less' : 'More' }
                        </Tooltip>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default ProjectCard
