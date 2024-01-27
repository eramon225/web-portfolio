import React from 'react'
import { Badge } from 'reactstrap'

export interface SkillsProps {
    category: string
    skills: string[]
};

const Skills: React.FC<SkillsProps> = ({ category, skills }) => {
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

export default Skills
