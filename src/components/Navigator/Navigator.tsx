import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import React, { useEffect, useState } from 'react'
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, Collapse, NavbarBrand } from 'reactstrap'
import { type FirebaseProps, fetchFire } from '../../firebaseUtils'

interface NavigatorPaylod {
    linkedinUrl: string
}

interface NavigatorItem {
    label: string | React.ReactNode
    to: string
}

interface NavigatorProps extends FirebaseProps {
    items: NavigatorItem[]
}

const NavbarComponent: React.FC<NavigatorProps> = ({ items, db, collectionName, orderByField, orderDirection }) => {
    const [collapsed, setCollapsed] = useState(true)
    const [navPayload, setNavPayload] = useState<NavigatorPaylod | null>(null)

    useEffect(() => {
        void fetchFire<NavigatorPaylod>(db, collectionName, orderByField, orderDirection).then((dataList: NavigatorPaylod[]) => {
            if (dataList.length > 0) {
                setNavPayload(dataList[0])
            }
        })
    }, [])

    const scrollToSection = (sectionId: string): void => {
        const section = document.getElementById(sectionId)
        const navbar = document.querySelector('.navbar')
        if (section !== null && navbar !== null) {
            const navbarHeight = navbar.clientHeight
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            })
        }
    }

    const toggleNavbar = (): void => { setCollapsed(!collapsed) }

    return (
        <Navbar
            color="dark"
            dark
            className="text-light"
            expand="md"
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}
        >
            <NavbarBrand href={navPayload !== null ? navPayload.linkedinUrl : ''}>
                <FontAwesomeIcon icon={faLinkedin}/>
            </NavbarBrand>
            <NavbarToggler onClick={toggleNavbar}/>
            <Collapse isOpen={!collapsed} navbar>
                <Nav className="mr-auto" navbar>
                    {items.map((item, index) => (
                        <NavItem key={`${index}_navItem`}>
                            <NavLink href="#" onClick={() => { scrollToSection(item.to) }}>{item.label}</NavLink>
                        </NavItem>
                    ))}
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default NavbarComponent
