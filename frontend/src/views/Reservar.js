import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap
import {Row, Breadcrumb, BreadcrumbItem} from 'reactstrap';

import {Link} from "react-router-dom";


class Reservar extends Component {

  render() {

    return (
      
      <Row className="text-center">

        <Breadcrumb>
            <BreadcrumbItem>
            <Link to="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
            <Link to="/cercarpropietat">Cercar Propietat</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
            <Link to="/viewpropietat">Propietat</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
            Reservar Propietat
            </BreadcrumbItem>
        </Breadcrumb>

        PAGINA RESERVAR
      
      </Row>  
      
    );
  }
}
 
export default Reservar;