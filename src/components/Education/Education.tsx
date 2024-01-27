import React from 'react'
import { Card, CardBody, CardTitle, CardText, Container, Col, Row } from 'reactstrap'

export interface EducationProps {
    schoolName: string
    degree: string
    fieldOfStudy: string
    startDate: string
    endDate: string
    gpa: string
    schoolImage: string
    schoolColor: string
}

const Education: React.FC<EducationProps> = ({ schoolName, degree, fieldOfStudy, startDate, endDate, gpa, schoolImage, schoolColor }) => {
    const cardStyle: React.CSSProperties = {
        border: 'none',
        backgroundColor: schoolColor
    }
    return (
        <Container>
            <Row >
                <Col md="2">
                    <img width="100%" src={schoolImage} alt="Profile Image" />
                </Col>
                <Col md="10">
                    <Card style={cardStyle} className="mb-2">
                        <CardBody>
                            <CardTitle tag="h5">{schoolName}</CardTitle>
                            <CardText><i>{degree}</i></CardText>
                            <CardText>{fieldOfStudy}</CardText>
                            <CardText>{startDate} - {endDate}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Education
