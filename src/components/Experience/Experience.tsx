import React from 'react'
import { Card, CardBody, CardText, CardHeader } from 'reactstrap'

export interface ExperienceProps {
    role: string
    company: string
    duration: string
    description: string
}

const Experience: React.FC<ExperienceProps> = ({ role, company, duration, description }) => {
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

export default Experience
