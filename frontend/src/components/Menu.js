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

// -- CSS IMPORTS --
import './Styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';//Css de bootstrap

class Menu extends Component {

  constructor(props) {
    super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false,
        idUsuari: props.idUsuariLogeat.idUsuariLogeat,
      };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
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
      
        <Navbar expand="md" fixed="top" light className="navb d-flex d-row justify-content-center border-bottom">
          
          {/* NavItem Home */}
          <NavItem className="mt-2 me-3 list-unstyled p-1">
            <Link className="mt-2 ms-2 text-decoration-none text-dark" to="/"><img src={Logo} width="120" height="30" /></Link>
          </NavItem>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="text-center mt-2 items-nav d-flex justify-content-center" navbar>

             
              {/* NavItem CercarPropietats */}
              <NavItem className="itemnav hover-effect-nav mt-1 text-end">
                <Link className="text-decoration-none text-dark" to="/cercarpropietat">{this.props.t('header.cercarPropietats')}</Link>
              </NavItem>
              <hr></hr>

              {/* NavItem Login */}
              <NavItem className="itemnav hover-effect-nav text-end">
                <Link className="text-decoration-none text-dark" to="/login">
                  <span>{this.props.t('header.login')} </span><DoorClosedFill className="mb-1" width="30" height="30"/>
                </Link>
              </NavItem>
              <hr></hr>

              {/* Component boto per canviar l'idioma */}
              <div className="d-md-none">
                <BotoIdioma />
              </div>
              <hr></hr>
             
            </Nav>
            </Collapse>

            {/* Component boto per canviar l'idioma */}
            <div className="d-none d-md-inline">
              <BotoIdioma />
            </div>

        </Navbar>
      
      );
    } else {

      return (

        <Navbar expand="md" fixed="top" light className="navb d-flex d-row justify-content-center border-bottom">
          
        {/* NavItem Home */}
        <NavItem className="mt-2 me-3 hover-effect-nav list-unstyled p-1">
          <Link className="mt-2 ms-2 text-decoration-none text-dark" to="/"><img src={Logo} width="120" height="30" /></Link>
        </NavItem>

        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="text-center mt-2 items-nav d-flex justify-content-center" navbar>

           
            {/* NavItem CercarPropietats */}
            <NavItem className="itemnav hover-effect-nav text-end">
              <Link className="text-decoration-none text-dark" to="/cercarpropietat">{this.props.t('header.cercarPropietats')}</Link>
            </NavItem>
            <hr></hr>

            {/* NavItem MisReservas */}
            <NavItem className="itemnav hover-effect-nav text-end">
                <Link className="text-decoration-none text-dark" to="/misreservas">{this.props.t('header.misreservas')}</Link>
            </NavItem>
            <hr></hr>

            {/* NavItem Loggout */}
            <NavItem className="ps-2 list-unstyled itemnav hover-effect-nav text-end">
              <Link className="text-decoration-none text-dark" onClick={this.tancarSessio} to="#">
              <span>{this.props.t('header.loggout')} </span><DoorOpenFill className="mb-1" width="30" height="30"/>
              </Link>
            </NavItem>
            <hr></hr>

            {/* Component boto per canviar l'idioma */}
            <div className="d-md-none">
              <BotoIdioma />
            </div>
            <hr></hr>
           
          </Nav>
          </Collapse>

          {/* Component boto per canviar l'idioma */}
          <div className="d-none d-md-inline">
            <BotoIdioma />
          </div>

      </Navbar>
      
      );
    }//Fi else

  }//Fi render
}
 
export default withTranslation()(Menu)