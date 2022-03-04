import React, { Component } from "react";
import {Navbar, NavbarToggler, Collapse, NavItem, Nav} from 'reactstrap';
import {Link} from "react-router-dom";

//Importam els logos del header
import Logo from '../media-front/logo.PNG';
import Loggout from '../media-front/loggout.PNG';
import LoginLogo from '../media-front/login.PNG';
import Login from "../views/Login";

class Menu extends Component {

  constructor(props) {
    super(props);

      this.state = {
        idUsuari: props.idUsuariLogeat.idUsuariLogeat,
      };
  }

  tancarSessio = () => {

    sessionStorage.removeItem("idUsuariLogeat");
    window.location.reload();

  }

  render() {

    const {idUsuari} = this.state;
    console.log(idUsuari)

    if (idUsuari == null){


      return (
      
        <div>
        <Navbar dark expand="md" fixed="top" light className="navb d-flex justify-content-center border-bottom">
          
          {/* NavItem Home */}
          <NavItem className="mt-2 me-3 list-unstyled">
            <Link className="mt-2 ms-2 text-decoration-none text-dark" to="/"><img src={Logo} width="120" height="30" /></Link>
          </NavItem>

          <NavbarToggler onClick={function noRefCheck(){}} />

            <Nav className="text-center mt-2" navbar>

              {/* NavItem CercarPropietats */}
              <NavItem className="me-4 itemnav">
                <Link className="text-decoration-none text-dark p-2 rounded" to="/cercarpropietat">Cerca Propietat</Link>
              </NavItem>

              {/* NavItem MisReservas */}
              <NavItem className="me-4 itemnav">
                <Link className="text-decoration-none text-dark p-2 rounded" to="/misreservas">Mis Reservas</Link>
              </NavItem>

              {/* NavItem Contact */}
              <NavItem className="me-4 itemnav">
                <Link className="text-decoration-none text-dark p-2 rounded" to="/contact">Contact</Link>
              </NavItem>

            </Nav>

          {/* NavItem Login */}
          <NavItem className="mt-2 me-3 list-unstyled">
          <Link className="mt-2 text-decoration-none text-dark" to="/login">
            <img src={LoginLogo} width="85" height="25" />
          </Link>
          </NavItem>

        </Navbar>
      </div>

);

    } else {


      return (
      
        <div className="p-4">
        <Navbar dark expand="md" fixed="top" light className="navb d-flex justify-content-center border-bottom">
          
          {/* NavItem Home */}
          <NavItem className="mt-2 me-3 list-unstyled">
            <Link className="mt-2 ms-2 text-decoration-none text-dark" to="/"><img src={Logo} width="120" height="30" /></Link>
          </NavItem>

          <NavbarToggler onClick={function noRefCheck(){}} />

            <Nav className="text-center mt-2" navbar>

              {/* NavItem CercarPropietats */}
              <NavItem className="me-4 itemnav">
                <Link className="text-decoration-none text-dark p-2 rounded" to="/cercarpropietat">Cerca Propietat</Link>
              </NavItem>

              {/* NavItem MisReservas */}
              <NavItem className="me-4 itemnav">
                <Link className="text-decoration-none text-dark p-2 rounded" to="/misreservas">Mis Reservas</Link>
              </NavItem>

              {/* NavItem Contact */}
              <NavItem className="me-4 itemnav">
                <Link className="text-decoration-none text-dark p-2 rounded" to="/contact">Contact</Link>
              </NavItem>

            </Nav>

          {/* NavItem Login */}
          <NavItem className="mt-2 me-3 list-unstyled">
          <Link className="mt-2 text-decoration-none text-dark" to="/login">
            <img onClick={this.tancarSessio} src={Loggout} width="85" height="25" />
          </Link>
          </NavItem>

        </Navbar>
      </div>
);



    }


    
   
  }
}
 
export default Menu;