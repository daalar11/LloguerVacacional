import React, { Component } from "react";
import {Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink, Nav} from 'reactstrap';
import {Link} from "react-router-dom";

class Menu extends Component {
  render() {
    return (
      
        <div>
        <Navbar color="dark" dark expand="md" fixed="top" light>

        <NavbarBrand href="/">
          <Link className="text-decoration-none text-white-50" to="/">Home</Link>
          </NavbarBrand>
          
          <NavbarToggler onClick={function noRefCheck(){}} />

          <Collapse navbar>
            <Nav className="me-auto" navbar>

              {/* NavItem CercarPropietats */}
              <NavItem>
                <NavLink href="/cercarpropietat">
                <Link className="text-decoration-none text-white-50" to="/cercarpropietat">Cerca Propietat</Link>
                </NavLink>
              </NavItem>

              {/* NavItem ViewPropietat */}
              <NavItem>
                <NavLink href="/viewpropietat">
                  <Link className="text-decoration-none text-white-50" to="/viewpropietat">View Propietat</Link>
                </NavLink>
              </NavItem>

              {/* NavItem Contact */}
              <NavItem>
                <NavLink href="/contact">
                <Link className="text-decoration-none text-white-50" to="/contact">Contact</Link>
                </NavLink>
              </NavItem>

            </Nav>
                 
          </Collapse>

          {/* NavItem Login */}
          <NavbarBrand href="/login">
            <Link className="text-decoration-none text-white-50" to="/login">Login</Link>
          </NavbarBrand>

        </Navbar>
      </div>
    );
  }
}
 
export default Menu;