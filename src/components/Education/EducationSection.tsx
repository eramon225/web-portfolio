import React, { useEffect, useState } from 'react'
import Education, { type EducationProps } from './Education'
import { Container } from 'reactstrap'
import { fetchFire, type FirebaseProps } from '../../firebaseUtils'

interface EducationSectionProps extends FirebaseProps {
}

const EducationSection: React.FC<EducationSectionProps> = ({ db, collectionName, orderByField, orderDirection }) => {
    const [educationList, setEducationList] = useState<EducationProps[]>([])

    useEffect(() => {
        void fetchFire<EducationProps>(db, collectionName, orderByField, orderDirection).then((dataList: EducationProps[]) => {
            setEducationList(dataList)
        })
    }, [])

    if (educationList.length === 0) {
        return null
    }

    return (
        <React.Fragment>
            <Container>
                <h2>Education</h2>
            </Container>
            <div>
                {educationList.map((education, index) => (
                    <div
                        key={`${index}_eductionSection`}
                        className="p-5"
                        style={{
                            backgroundColor: education.schoolColor
                        }}
                    >
                        <Education {...education}/>
                    </div>
                ))}
            </div>
        </React.Fragment>
    )
}

export default EducationSection
