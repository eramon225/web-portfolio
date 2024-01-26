import React from 'react'
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap'

interface AboutMeProps {
    name: string
    paragraphs: string[]
    imageUrl: string
};

const AboutMe: React.FC<AboutMeProps> = ({ name, paragraphs, imageUrl }) => {
    const cardStyle: React.CSSProperties = {
        border: 'none',
        backgroundColor: 'transparent'
    }
    return (
        <Container>
            <Row>
                <Col md="2">
                    <Card style={cardStyle}>
                        <CardImg top width="100%" src={imageUrl} alt="Profile Image" />
                    </Card>
                </Col>
                <Col md="10">
                    <Card style={cardStyle}>
                        <CardBody className="pt-0">
                            <CardTitle tag="h3">About {name}</CardTitle>
                            { paragraphs.map((paragraph: string, index: number) =>
                                <CardText
                                    key={`${index}_paragraph`}
                                >
                                    {paragraph}
                                </CardText>
                            ) }
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default AboutMe
