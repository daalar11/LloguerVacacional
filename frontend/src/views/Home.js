import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap
import {Row, Col, Breadcrumb, BreadcrumbItem} from 'reactstrap';

import Carrousel from "../components/Carrousel";

import axios from 'axios';

import {Link} from "react-router-dom";

class Home extends Component {

  constructor(props) {
    super(props);

      this.state = {
        fotos: [],
        isLoading: false,
        error: null,
      };
  }

  getFotos = () => {

    var url = "http://127.0.0.1:8000"
    var request = "/propietat/fotos/info/portades";
    
    axios.get(url + request)
    .then(res => {this.setState({
      fotos: res.data,
          status: true
        });
    })
    //Tractam errors
    .catch(error => this.setState({
      error,
      isLoading: false
    }));
  }

  //Metode componentDidMount
  componentDidMount = () => {
    this.getFotos();
  }

  render() {

    const { fotos, isLoading, error} = this.state;

  
    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      
      <Row>

        <Breadcrumb>
          <BreadcrumbItem active>
            Home
          </BreadcrumbItem>
        </Breadcrumb>

        <Carrousel 
        fotos = {fotos}
        
        />
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