import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap
import {Row, Col, Breadcrumb, BreadcrumbItem} from 'reactstrap';

import Carrousel from "../components/Carrousel";

import {Link} from "react-router-dom";

class Home extends Component {

  render() {

    return (
      
      <Row>

        <Breadcrumb>
          <BreadcrumbItem active>
            Home
          </BreadcrumbItem>
        </Breadcrumb>

        <Carrousel />
        <Col xs="12" className="mt-5">

          Cerca Una Casa!
          <br></br>
          <Link to="/cercarpropietat">Cercador</Link>

        </Col>
        <Col xs="12" className="mt-5">

          Dona d'alta la teva propia propietat i comença a alquilar!
          <br></br>
          <a href="http://localhost:8080/">BackOffice!</a>

        </Col>
      
      </Row>  
      
    );
  }
}
 
export default Home;