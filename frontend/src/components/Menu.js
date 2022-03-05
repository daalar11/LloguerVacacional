import React, { Component } from "react";
import {Navbar, NavbarToggler, Collapse, NavItem, Nav} from 'reactstrap';
import {Link} from "react-router-dom";

//Importam els logos del header
import Logo from '../media-front/logo.PNG';

import { DoorClosedFill, DoorOpenFill } from 'react-bootstrap-icons';

//Imports Traduccions
import { withTranslation } from 'react-i18next';

//Boto canviar idioma
import BotoIdioma from "./BotoIdioma";

class Menu extends Component {

  constructor(props) {
    super(props);

      this.state = {
        idUsuari: props.idUsuariLogeat.idUsuariLogeat,
      };
  }

  //Metode que elimina la sessio i recarrega la pagina
  tancarSessio = () => {

    sessionStorage.removeItem("idUsuariLogeat");
    window.location.reload();

  }

  render() {

    const {idUsuari} = this.state;

    //Condicio Usuari No Logeat
    if (idUsuari == null){

      return (
      
        <Navbar expand="md" fixed="top" light className="navb d-flex justify-content-center border-bottom">
          
          {/* NavItem Home */}
          <NavItem className="mt-2 me-3 list-unstyled">
            <Link className="mt-2 ms-2 text-decoration-none text-dark" to="/"><img src={Logo} width="120" height="30" /></Link>
          </NavItem>

          <NavbarToggler onClick={function noRefCheck(){}} />

            <Nav className="text-center mt-2" navbar>

            

              {/* NavItem CercarPropietats */}
              <NavItem className="itemnav">
                <Link className="text-decoration-none text-dark" to="/cercarpropietat">{this.props.t('header.cercarPropietats')}</Link>
              </NavItem>

              {/* NavItem Contact */}
              <NavItem className="itemnav">
                <Link className="text-decoration-none text-dark" to="/contact">{this.props.t('header.contact')}</Link>
              </NavItem>

            </Nav>

          {/* Component boto per canviar l'idioma */}
          <BotoIdioma />

          {/* NavItem Login */}
          <NavItem className="mt-2 me-3 list-unstyled">
          <Link className="mt-2 text-decoration-none text-dark" to="/login">
            <span>{this.props.t('header.login')} </span><DoorClosedFill className="mb-1" width="30" height="30"/>
            
          </Link>
          </NavItem>

        </Navbar>
      
      );
    } else {

      return (
      
        <Navbar expand="md" fixed="top" light className="navb d-flex justify-content-center border-bottom">
          
          {/* NavItem Home */}
          <NavItem className="mt-2 me-3 list-unstyled">
            <Link className="mt-2 ms-2 text-decoration-none text-dark" to="/"><img src={Logo} width="120" height="30" /></Link>
          </NavItem>

          <NavbarToggler onClick={function noRefCheck(){}} />

            <Nav className="text-center mt-2" navbar>

              {/* NavItem CercarPropietats */}
              <NavItem className="itemnav">
                <Link className="text-decoration-none text-dark" to="/cercarpropietat">{this.props.t('header.cercarPropietats')}</Link>
              </NavItem>

              {/* NavItem MisReservas */}
              <NavItem className="itemnav">
                <Link className="text-decoration-none text-dark" to="/misreservas">{this.props.t('header.misreservas')}</Link>
              </NavItem>

              {/* NavItem Contact */}
              <NavItem className="itemnav">
                <Link className="text-decoration-none text-dark" to="/contact">{this.props.t('header.contact')}</Link>
              </NavItem>

            </Nav>

          {/* Component boto per canviar l'idioma */}
          <BotoIdioma />

          {/* NavItem Login */}
          <NavItem className="mt-2 me-3 list-unstyled">
            <Link className="mt-2 text-decoration-none text-dark" to="#">
            <span>{this.props.t('header.loggout')} </span><DoorOpenFill className="mb-1" width="30" height="30"/>
            </Link>
          </NavItem>
        </Navbar>
      );
    }//Fi else

  }//Fi render
}
 
export default withTranslation()(Menu)