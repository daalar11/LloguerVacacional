import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap
import {Row, Col, Breadcrumb, BreadcrumbItem} from 'reactstrap';

import Carrousel from "../components/Carrousel";

import axios from 'axios';

import {Link} from "react-router-dom";

//Css de ViewPropietat
import '../components/PropietatExpand.css';

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
      
      <Row className="p-4 bg-opacity-50">

        <Breadcrumb>
          <BreadcrumbItem active>
            Home
          </BreadcrumbItem>
        </Breadcrumb>
        <br></br>
        <hr></hr>
        <br></br>

        <Row className="  ">

          <Col xs="12"xl="8">

            <Carrousel
            fotos = {fotos}
            />

          </Col>
          <Col className="d-flex align-items-center row">
            <Row >
              <h1 xl="4" className=".d-none .d-sm-block" >La major web de lloguer vacacional</h1>
            </Row>
            <Row>
              <Link to={"/cercarpropietat"}>
                <button className="d-none d-sm-block col-xl-4" className="btn btn-dark">Lloga una casa! </button>
              </Link>
            </Row>
          </Col>

        </Row>

        <br></br>
        <hr></hr>
        <br></br>

        <Row className="d-flex justify-content-end">
          <Col xl="8" className="colCercaCases">

            <span className="text-white fs-2 bg-danger">Cerca Una Casa!<br></br><Link to="/cercarpropietat">Cercador</Link></span>
            

          </Col>
        </Row>

        <br></br>
        <hr className=""></hr>
        <br></br>

        <Row className="d-flex justify-content-start">
          <Col xs="9" className="colBackoffice">

            Dona d'alta la teva propia propietat i comença a alquilar!
            <br></br>
            <a href="http://localhost:8080/">BackOffice!</a>

          </Col>
        </Row>
      </Row>  
      
    );
  }
}
 
export default Home;