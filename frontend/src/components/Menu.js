import React, { Component } from "react";
import {Navbar, NavbarToggler, Collapse, NavItem, Nav} from 'reactstrap';
import {Link} from "react-router-dom";

class Menu extends Component {
  render() {
    return (
      
        <div>
        <Navbar dark expand="md" fixed="top" light className="navb d-flex justify-content-center border-bottom">

        
          
          
          <NavbarToggler onClick={function noRefCheck(){}} />

      

            <Nav className="me-auto " navbar>

              {/* NavItem Home */}
              <NavItem className="mt-2 me-3">
                <Link className="mt-2 me-3 text-decoration-none text-dark" to="/">Home</Link>
              </NavItem>

              {/* NavItem CercarPropietats */}
              <NavItem className="mt-2 me-3">
                <Link className="text-decoration-none text-dark" to="/cercarpropietat">Cerca Propietat</Link>
              </NavItem>

              {/* NavItem MisReservas */}
              <NavItem className="mt-2 me-3">
                <Link className="text-decoration-none text-dark" to="/misreservas">Mis Reservas</Link>
              </NavItem>

              {/* NavItem Contact */}
              <NavItem className="mt-2 me-3">
                <Link className="text-decoration-none text-dark" to="/contact">Contact</Link>
              </NavItem>

            </Nav>
             
         

          {/* NavItem Login */}
          <Link className="mt-2 text-decoration-none text-white-50" to="/login">Login</Link>

        </Navbar>
      </div>
    );
  }
}
 
export default Menu;