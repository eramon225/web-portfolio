import React from 'react'
import { Badge, Container, Col, Row } from 'reactstrap'

export interface SkillCategoryProps {
    category: string
    skills: string[]
};

const SkillCategory: React.FC<SkillCategoryProps> = ({ category, skills }) => {
    return (
        <div className='mb-2'>
            <h5>{category}</h5>
            {skills.map((skill, index) => (
                <span
                    key={`${index}_skill`}
                    style={{
                        marginRight: '0.15em'
                    }}
                >
                    <Badge key={index} color="secondary" className="text-light" pill>
                        {skill}
                    </Badge>
                </span>
            ))}
        </div>
    )
}

interface SkillsProps {
    skillCategories: SkillCategoryProps[]
};

const Skills: React.FC<SkillsProps> = ({ skillCategories }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h3>Skills</h3>
                    {skillCategories.map((entry: SkillCategoryProps, index) => (<SkillCategory key={index} {...entry} />))}
                </Col>
            </Row>
        </Container>
    )
}

export default Skills
