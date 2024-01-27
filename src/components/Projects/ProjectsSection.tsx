import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import ProjectCard, { type ProjectProps } from './Projects'

interface ProjectsSectionProps {
    label: string
    projects: ProjectProps[]
};

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ label, projects }) => {
    const labelNoSpaces: string = label.replace(' ', '-')
    return (
        <Container>
            <Row>
                <Col>
                    <h3>{label}</h3>
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={`project-${labelNoSpaces}-${index}`}
                            {...project}
                            id={`project-${labelNoSpaces}-${index}`}
                        />
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

export default ProjectsSection
