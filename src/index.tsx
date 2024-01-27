import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import ProfessionalExperience, { type ExperienceProps } from './components/Experience/Experience'
import Skills, { type SkillCategoryProps } from './components/Skills/Skills'
import ProjectsSection from './components/Projects/ProjectsSection'
import AboutMe from './components/AboutMe/AboutMe'
import Navigator from './components/Navigator/Navigator'
import Banner from './components/Banner/Banner'
import firebaseConfig from '../public/firebaseConfig.json'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, orderBy, query } from 'firebase/firestore'
import EducationSection from './components/Education/EducationSection'
import { type EducationProps } from './components/Education/Education'
import { type ProjectProps } from './components/Projects/Projects'

const app = initializeApp(firebaseConfig)

interface AboutMePayload {
    linkedinUrl: string
    name: string
    paragraphs: string[]
}

const App: React.FC = () => {
    const [skills, setSkills] = useState<SkillCategoryProps[]>([])
    const [experience, setExperience] = useState<ExperienceProps[]>([])
    const [aboutMe, setAboutMe] = useState<AboutMePayload | null>(null)
    const [projects, setProjects] = useState<ProjectProps[]>([])
    const [personalProjects, setPersonalProjects] = useState<ProjectProps[]>([])
    const [education, setEducation] = useState<EducationProps[]>([])

    const db = getFirestore(app)

    useEffect(() => {
        async function fetchFire<T> (collectionName: string, orderByField: string = '', orderDirection: 'asc' | 'desc' = 'asc'): Promise<T[]> {
            const collectionRef = collection(db, collectionName)
            const queryConstraint = query(collectionRef, orderBy(orderByField, orderDirection))
            const querySnapshot = await getDocs(queryConstraint)
            return querySnapshot.docs.map(doc => doc.data()) as T[]
        }

        void fetchFire<SkillCategoryProps>('skills', 'order').then((dataList: SkillCategoryProps[]) => {
            setSkills(dataList)
        })
        void fetchFire<ExperienceProps>('professional-experience', 'recent').then((dataList: ExperienceProps[]) => {
            setExperience(dataList)
        })
        void fetchFire<AboutMePayload>('about-me', 'name').then((dataList: AboutMePayload[]) => {
            if (dataList.length > 0) {
                setAboutMe(dataList[0])
            }
        })
        void fetchFire<EducationProps>('education', 'recent').then((dataList: EducationProps[]) => {
            setEducation(dataList)
        })
        void fetchFire<ProjectProps>('projects', 'recent').then((dataList: ProjectProps[]) => {
            setProjects(dataList)
        })
        void fetchFire<ProjectProps>('personal-projects', 'recent').then((dataList: ProjectProps[]) => {
            setPersonalProjects(dataList)
        })
    }, [])

    return (
        <React.Fragment>
            <Navigator
                linkedinUrl={aboutMe !== null ? aboutMe.linkedinUrl : ''}
                items={[{
                    label: 'About Me',
                    to: 'about-me-section'
                }, {
                    label: 'Skills',
                    to: 'skills-section'
                }, {
                    label: 'Experience',
                    to: 'experience-section'
                }, {
                    label: 'Projects',
                    to: 'projects-section'
                }, {
                    label: 'Personal Projects',
                    to: 'personal-projects-section'
                }, {
                    label: 'Education',
                    to: 'education-section'
                }]}
            />
            <div style={{ width: '100%' }}>
                <Banner backgroundImageUrl="/san-antonio-banner.avif" />
            </div>
            <div id="about-me-section" className='mt-5'>
                {
                    aboutMe !== null
                        ? (
                            <AboutMe
                                imageUrl='/enhanced_professional_photo.jpg'
                                name={aboutMe.name}
                                paragraphs={aboutMe.paragraphs}
                            />
                        )
                        : null
                }
            </div>
            <div id="skills-section" className="mb-5">
                {
                    skills.length > 0
                        ? (
                            <Skills
                                skillCategories={skills}
                            />
                        )
                        : null
                }
            </div>
            <div id="experience-section" className="mb-5">
                {
                    experience.length > 0
                        ? (
                            <ProfessionalExperience experiences={experience}/>
                        )
                        : null
                }
            </div>
            <div id="projects-section" className="mb-5">
                {
                    projects.length > 0
                        ? (
                            <ProjectsSection label="Projects" projects={projects}/>
                        )
                        : null
                }
            </div>
            <div id="personal-projects-section" className="mb-5">
                {
                    personalProjects.length > 0
                        ? (
                            <ProjectsSection label="Personal Projects" projects={personalProjects}/>
                        )
                        : null
                }
            </div>
            <div
                id="education-section"
            >
                {
                    education.length > 0
                        ? (
                            <EducationSection educationList={education}/>
                        )
                        : null
                }
            </div>
        </React.Fragment>
    )
}

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(<App />, document.getElementById('root'))
