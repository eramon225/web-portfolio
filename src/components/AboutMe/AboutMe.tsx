import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap'
import { type FirebaseProps, fetchFire } from '../../firebaseUtils'

interface AboutMePayload {
    name: string
    paragraphs: string[]
    photo: string
    id: string
}

interface AboutMeProps extends FirebaseProps {
}

const AboutMe: React.FC<AboutMeProps> = ({ db, collectionName, orderByField, orderDirection }) => {
    const [aboutMe, setAboutMe] = useState<AboutMePayload | null>(null)

    useEffect(() => {
        void fetchFire<AboutMePayload>(db, collectionName, orderByField, orderDirection).then((dataList: AboutMePayload[]) => {
            if (dataList.length > 0) {
                setAboutMe(dataList[0])
            }
        })
    }, [])

    if (aboutMe === null) {
        return null
    }
    const cardStyle: React.CSSProperties = {
        border: 'none',
        backgroundColor: 'transparent'
    }
    return (
        <Container>
            <Row>
                <Col md="2">
                    <Card style={cardStyle}>
                        <CardImg top width="100%" src={aboutMe.photo} alt="Profile Image" />
                    </Card>
                </Col>
                <Col md="10">
                    <Card style={cardStyle}>
                        <CardBody className="pt-0">
                            <CardTitle tag="h3">About {aboutMe.name}</CardTitle>
                            { aboutMe.paragraphs.map((paragraph: string, index: number) =>
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
