import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ProjectCard, { type ProjectProps } from './Projects'
import { type FirebaseProps, fetchFire } from '../../firebaseUtils'

interface ProjectsSectionProps extends FirebaseProps {
    label: string
};

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ label, db, collectionName, orderByField, orderDirection }) => {
    const [projects, setProjects] = useState<ProjectProps[]>([])

    useEffect(() => {
        void fetchFire<ProjectProps>(db, collectionName, orderByField, orderDirection).then((dataList: ProjectProps[]) => {
            setProjects(dataList)
        })
    }, [])

    const labelNoSpaces: string = label.replace(' ', '-')

    if (projects.length === 0) {
        return null
    }

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
