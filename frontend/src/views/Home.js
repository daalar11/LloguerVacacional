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

    var url = "http://127.0.0.1:8000";
    
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

          <Col xs="12"xl="12" className="mb-3">

            <Carrousel 
            fotos = {fotos}
            />

          </Col>
          
        </Row>

        <br></br>
        <hr></hr>
        <br></br>

        <Row className="d-flex justify-content-end pb-3">
        <Col xl="4" className="d-flex align-items-center row">
            <Row className="mt-3 mb-3">
              <h1 xl="4" xs="12" >La major web de lloguer vacacional</h1>
            </Row>
            <Row >
              <Link className="d-flex justify-content-center" to={"/cercarpropietat"}>
                <button className=" col-xl-4 btn btn-dark mb-3">Lloga una casa! </button>
              </Link>
            </Row>
          </Col>
          <Col xl="8"  xs="12"className="colCercaCases ">

          </Col>
         
        </Row>

        <br></br>
        <hr className=""></hr>
        <br></br>

        
        <Row className="d-flex justify-content-start pt-3">
          <Col  className="d-block d-sm-none align-items-center row">
            <Row className=" mb-3">
              <h1 xl="4" xs="12" >Fes feina amb nosaltres</h1>
            </Row>
            <Row >
              <a className="d-flex justify-content-center" href="http://localhost:8080/">
                <button  className="col-xl-4 btn btn-dark mb-3">Feste propietari! </button>
              </a>
            </Row>
          </Col>

          <Col xl="8"  xs="12" className="colBackoffice pb-2">


          </Col>
          <Col xl="4" className="d-flex d-none d-sm-block  align-items-center row">
            <Row className=" mb-3">
              <h1 xl="4" xs="12" >Fes feina amb nosaltres</h1>
            </Row>
            <Row >
              <a className="d-flex justify-content-center" href="http://localhost:8080/">
                <button  className="col-xl-4 btn btn-dark mb-3">Feste propietari! </button>
              </a>
            </Row>
          </Col>
        </Row>
      </Row>  
      
    );
  }
}
 
export default Home;