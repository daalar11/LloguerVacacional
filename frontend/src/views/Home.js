import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap
import {Row, Col, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import Carrousel from "../components/Carrousel";
import axios from 'axios';
import {Link} from "react-router-dom";
//Imports Traduccions
import { withTranslation } from 'react-i18next';

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

    //var url = "http://127.0.0.1:8000";
    var url = "https://api.lloguerdavid.me";
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
          {this.props.t('breadcrumb.home')}
          </BreadcrumbItem>
        </Breadcrumb>
        <br></br>
        <hr className="hrs"></hr>
        <br></br>

        <Row className="  ">

          <Col xs="12"xl="12" className="mb-3">

            <Carrousel 
            fotos = {fotos}
            />

          </Col>
          
        </Row>

        <br></br>
        <hr className="hrs"></hr>
        <br></br>

        <Row className="d-flex justify-content-end pb-3">
        <Col xl="4" className="d-flex align-items-center row">
            <Row className="mt-3 mb-3">
              <h4 xl="4" xs="12" className="text-start">{this.props.t('home.copdull')}<br></br><br></br>{this.props.t('home.millors')}</h4>
            </Row>
            <Row >
              <Link className="d-flex justify-content-center" to={"/cercarpropietat"}>
                <button className=" col-xl-4 mb-3 boto-comença-llogar">{this.props.t('home.botollogar')}</button>
              </Link>
            </Row>
          </Col>
          <Col xl="8"  xs="12"className="colCercaCases ">

          </Col>
         
        </Row>

        <br></br>
        <hr className="hrs"></hr>
        <br></br>

        
        <Row className="d-flex justify-content-start pt-3">
          <Col  className="d-block d-sm-none align-items-center row">
            <Row className=" mb-3">
            <h4 xl="4" xs="12" className="ms-5 text-start">{this.props.t('home.deixarclaus')}<br></br><br></br>
            {this.props.t('home.deixans')}
              </h4>
            </Row>
            <Row >
            <a className="d-flex justify-content-center" href="http://localhost:8080/">
                <button aria-label="cerca casa" className="col-xl-4 mb-3 ms-5 boto-comença-llogar">{this.props.t('home.botopropietari')}</button>
              </a>
            </Row>
          </Col>

          <Col xl="8"  xs="12" className="colBackoffice pb-2">


          </Col>
          <Col xl="4" className="d-flex d-none d-sm-block  align-items-center row">
            <Row className=" mb-3">
              <h4 xl="4" xs="12" className="ms-4 text-start">{this.props.t('home.deixarclaus')}<br></br><br></br>
              {this.props.t('home.deixans')}
              </h4>
            </Row>
            <Row >
              <a className="d-flex justify-content-center" href="http://localhost:8080/">
                <button aria-label="feste propietari"  className="col-xl-4  mb-3 boto-comença-llogar">{this.props.t('home.botopropietari')}</button>
              </a>
            </Row>
          </Col>
        </Row>
      </Row>  
      
    );
  }
}
 
export default withTranslation()(Home);