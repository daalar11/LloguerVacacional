import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap
import Propietat from '../components/Propietat';
import Cercador from "../components/Cercador";
import {Container, Row, Col } from 'reactstrap';

//Importam Axios
import axios from 'axios';

class Cercarpropietat extends Component {

  constructor(props) {
    super(props);

    this.state = {
      propietats: [],
      isLoading: false,
      error: null,
    };
  }

  //Metode amb la peticio axios a n url.
  carregarPropietats = () => {

    //var url="api.lloguerdavid.me";
    var url = "http://127.0.0.1:8000";
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

    console.log(propietats)
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
                            caracteristica={propietats.caracteristica}
                            preu={propietats.preu_base}
                            id={propietats.idpropietat}
                            src="http://admin.lloguerdavid.me/Media/1234-media/1234-portada.jpg"
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