import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { fetchFire, type FirebaseProps } from '../../firebaseUtils'
import { type ExperienceProps } from './Experience'
import Experience from './Experience'

interface ExperienceSectionProps extends FirebaseProps {

}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ db, collectionName, orderByField, orderDirection }) => {
    const [experiences, setExperiences] = useState<ExperienceProps[]>([])

    useEffect(() => {
        void fetchFire<ExperienceProps>(db, collectionName, orderByField, orderDirection).then((dataList: ExperienceProps[]) => {
            setExperiences(dataList)
        })
    }, [])

    if (experiences.length === 0) {
        return null
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Professional Experience</h2>
                    {experiences.map((exp, index) => (<Experience key={index} {...exp} />))}
                </Col>
            </Row>
        </Container>
    )
}

export default ExperienceSection
