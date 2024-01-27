import React from 'react'
import { Container, Row, Col, Card, CardBody, CardText, CardHeader } from 'reactstrap'

export interface ExperienceProps {
    role: string
    company: string
    duration: string
    description: string
}

const ExperienceCard: React.FC<ExperienceProps> = ({ role, company, duration, description }) => {
    return (
        <Card className="mb-3" color='dark'>
            <CardHeader><h5>{role} - {company}</h5></CardHeader>
            <CardBody>
                <CardText><i>{duration}</i></CardText>
                <CardText>{description}</CardText>
            </CardBody>
        </Card>
    )
}

interface ProfessionalExperienceProps {
    experiences: ExperienceProps[]
}

const ProfessionalExperience: React.FC<ProfessionalExperienceProps> = ({ experiences }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Professional Experience</h2>
                    {experiences.map((exp, index) => (<ExperienceCard key={index} {...exp} />))}
                </Col>
            </Row>
        </Container>
    )
}

export default ProfessionalExperience
