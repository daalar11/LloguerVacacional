import React, { Component } from "react";
import Propietat from "../components/Propietat";
import Carrousel from "../components/Carrousel";
import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap
import {Container, Row, Col } from 'reactstrap';

import axios from 'axios';

//Importam query string
//import queryString from 'query-string';
 
class Viewpropietat extends Component {

  constructor(props) {
    super(props);

    this.state = {
      propietat: [],
      localitat:[],
      isLoading: false,
      error: null,
    };
  }

  //Metode amb la peticio axios a n url.
  vistaPropietat = () => {

    //Agafam el parametres de la URL d'aquesta forma. (No fa falta instalar cap packet, ve a javascript intern)
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');

    var url = "http://127.0.0.1:8000"
    var request = "/all/" + id;

    axios.get(url + request)
    .then(res => {this.setState({
      propietat: res.data,
      localitat: res.data.localitat,
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
  componentDidMount = () => {this.vistaPropietat();
  console.log(this.state.propietat);}

  render() {

    const { propietat, localitat, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (

      <Container>
          <Row className="mb-3">
            <Carrousel />
          </Row>
          <Row >
            <Col>
            <Propietat
                title = {propietat.nom_propietat}
                subtitle = {localitat.nom_localitat}
                text={this.state.propietat.normes}
                url="http://www.mylink1.com"
                caracteristica={propietat.caracteristica}
                preu={this.state.propietat.preu_base}
                id={this.state.propietat.idpropietat}
                src="http://admin.lloguerdavid.me/Media/1234-media/1234-portada.jpg"
                />
            </Col>
        
          </Row>
        </Container>



    );
    
    
  }
}
 
export default Viewpropietat;