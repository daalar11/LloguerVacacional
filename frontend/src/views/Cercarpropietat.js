import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap
import Propietat from '../components/Propietat';
import Cercador from "../components/Cercador";
import {Container, Row, Col } from 'reactstrap';

import axios from 'axios';
 
class Cercarpropietat extends Component {

  constructor(props) {
    super(props);

    this.state = {
      propietats: [],
      isLoading: false,
      error: null,
      caracte
    };
  }

  //Metode amb la peticio axios a n url.
  carregarPropietats = () => {

    var url = "http://127.0.0.1:8000"
    var request = "/all";

    axios.get(url + request)
    .then(res => {this.setState({
      propietats: res.data,
          status: true
        });
    })
    .catch(error => this.setState({
      error,
      isLoading: false
    }));
  }

  //Metode componentDidMount
  componentDidMount = () => {this.carregarPropietats();}

  render() {

    const { propietats, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      
      <div>
        <h2>PAGINA CERCADOR DE PROPIETATS</h2>

        <p>
          CERCADOR AMB FILTRES
        </p>


        <Container>
          <Row>
            <Col>
                <Cercador></Cercador>
            </Col>
          </Row>
          <Row>
            <Col>

            {propietats.map(function(propietats, key) {
                          
                          return (
                            
                            <Propietat key = {key}
                            title = {propietats.nom_propietat}
                            subtitle = {propietats.localitat.nom_localitat}
                            text={propietats.normes} 
                            url="http://www.mylink1.com" 
                            caracterisica={propietats.caracteristica}
                            preu={propietats.preu_base}
                            src="https://tdj.gg/uploads/attachs/64208_a58fc3c83bacd7531287dd54c5f0580927894613-56ce822d9e067cab682b844e.jpg"
                           />
                            

                          )
                        })}
                      
            </Col>
                  
          </Row>
        </Container>
 
        
      </div>
    );
  }
}
 
export default Cercarpropietat;