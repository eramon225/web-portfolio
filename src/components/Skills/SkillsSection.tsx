import React, { useEffect, useState } from 'react'
import { type SkillsProps } from './Skills'
import { Col, Container, Row } from 'reactstrap'
import Skills from './Skills'
import { type FirebaseProps, fetchFire } from '../../firebaseUtils'

interface SkillsSectionProps extends FirebaseProps {
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ db, collectionName, orderByField, orderDirection }) => {
    const [skills, setSkills] = useState<SkillsProps[]>([])
    useEffect(() => {
        void fetchFire<SkillsProps>(db, collectionName, orderByField, orderDirection).then((dataList: SkillsProps[]) => {
            setSkills(dataList)
        })
    }, [])

    if (skills.length === 0) {
        return null
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Skills</h3>
                    {skills.map((entry: SkillsProps, index) => (<Skills key={index} {...entry} />))}
                </Col>
            </Row>
        </Container>
    )
}

export default SkillsSection
