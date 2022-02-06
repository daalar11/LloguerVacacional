import React, { Component } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';
 
class Menu extends Component {
  render() {
    return (
      
        <div>
        <Navbar
          color="dark"
          dark
          expand="md"
          fixed="top"
          light
        >
          <NavbarBrand href="/">
            Home
          </NavbarBrand>
          <NavbarToggler onClick={function noRefCheck(){}} />
          <Collapse navbar>
            <Nav
              className="me-auto"
              navbar
            >
              <NavItem>
                <NavLink href="/cercarpropietat">
                  Cercar Propietat
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/contact">
                  Contact
                </NavLink>
              </NavItem>
              <UncontrolledDropdown
                inNavbar
                nav
              >
                <DropdownToggle
                  caret
                  nav
                >
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="/login">
                  Loggin
                </NavLink>
              </NavItem>
            </Nav>
            
            
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
 
export default Menu;