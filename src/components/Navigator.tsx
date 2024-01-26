import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import React, { useState } from 'react'
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, Collapse, NavbarBrand } from 'reactstrap'

interface NavigatorItem {
    label: string | React.ReactNode
    to: string
}

interface NavigatorProps {
    items: NavigatorItem[]
    linkedinUrl: string
}

const NavbarComponent: React.FC<NavigatorProps> = ({ items, linkedinUrl }) => {
    const [collapsed, setCollapsed] = useState(true)
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
            <NavbarBrand href={linkedinUrl}>
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
