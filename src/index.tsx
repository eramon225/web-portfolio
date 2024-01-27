import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import ProjectsSection from './components/Projects/ProjectsSection'
import AboutMe from './components/AboutMe/AboutMe'
import Navigator from './components/Navigator/Navigator'
import Banner from './components/Banner/Banner'
import firebaseConfig from '../public/firebaseConfig.json'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import EducationSection from './components/Education/EducationSection'
import SkillsSection from './components/Skills/SkillsSection'
import ExperienceSection from './components/Experience/ExperienceSection'

const app = initializeApp(firebaseConfig)

const App: React.FC = () => {
    const db = getFirestore(app)

    return (
        <React.Fragment>
            <Navigator
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
                db={db} collectionName='navigator' orderByField='linkedinUrl'
            />
            <div style={{ width: '100%' }}>
                <Banner db={db} collectionName='banner' orderByField='image' />
            </div>
            <div id="about-me-section" className='mt-5'>
                <AboutMe db={db} collectionName='about-me' orderByField='name' />
            </div>
            <div id="skills-section" className="mb-5">
                <SkillsSection db={db} collectionName='skills' orderByField='order' />
            </div>
            <div id="experience-section" className="mb-5">
                <ExperienceSection db={db} collectionName='professional-experience' orderByField='recent' />
            </div>
            <div id="projects-section" className="mb-5">
                <ProjectsSection label='Projects' db={db} collectionName='projects' orderByField='recent'/>
            </div>
            <div id="personal-projects-section" className="mb-5">
                <ProjectsSection label='Personal Projects' db={db} collectionName='personal-projects' orderByField='recent'/>
            </div>
            <div id="education-section">
                <EducationSection db={db} collectionName='education' orderByField='recent'/>
            </div>
        </React.Fragment>
    )
}

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(<App />, document.getElementById('root'))
