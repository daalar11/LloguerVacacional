import React, { Component } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';
import {Link} from "react-router-dom";

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
          <Link to="/">HOME</Link>
          </NavbarBrand>
          <NavbarToggler onClick={function noRefCheck(){}} />
          <Collapse navbar>
            <Nav
              className="me-auto"
              navbar
            >
              <NavItem>
                <NavLink href="/cercarpropietat">
                <Link to="/cercarpropietat">Cerca Propietat</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/contact">
                <Link to="/contact">Contact</Link>
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
                  <Link to="/login">Login</Link>
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