import React, { Component } from "react";
import {Navbar, NavbarToggler, Collapse, NavItem, Nav} from 'reactstrap';
import {Link} from "react-router-dom";

class Menu extends Component {
  render() {
    return (
      
        <div>
        <Navbar color="dark" dark expand="md" fixed="top" light>

        
          <Link className="mt-2 me-3 text-decoration-none text-white-50" to="/">Home</Link>
          
          <NavbarToggler onClick={function noRefCheck(){}} />

          <Collapse navbar>
            <Nav className="me-auto" navbar>

              {/* NavItem CercarPropietats */}
              <NavItem className="mt-2 me-3">
                <Link className="text-decoration-none text-white-50" to="/cercarpropietat">Cerca Propietat</Link>
              </NavItem>

              {/* NavItem MisReservas */}
              <NavItem className="mt-2 me-3">
                <Link className="text-decoration-none text-white-50" to="/misreservas">Mis Reservas</Link>
              </NavItem>

              {/* NavItem ViewPropietat
              <NavItem className="mt-2 me-3">
                  <Link className="text-decoration-none text-white-50" to="/viewpropietat">View Propietat</Link>
              </NavItem> */}

              {/* NavItem Contact */}
              <NavItem className="mt-2 me-3">
                <Link className="text-decoration-none text-white-50" to="/contact">Contact</Link>
              </NavItem>

            </Nav>
             
          </Collapse>

          {/* NavItem Login */}
          <Link className="mt-2 text-decoration-none text-white-50" to="/login">Login</Link>

        </Navbar>
      </div>
    );
  }
}
 
export default Menu;