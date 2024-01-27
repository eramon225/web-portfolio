import React from 'react'
import Education, { type EducationProps } from './Education'
import { Container } from 'reactstrap'

interface EducationSectionProps {
    educationList: EducationProps[]
}

const EducationSection: React.FC<EducationSectionProps> = ({ educationList }) => {
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
