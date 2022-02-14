import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap
import Propietat from '../components/Propietat';
import {Container, Row, Col } from 'reactstrap';

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

    var url = "http://127.0.0.1:8000"
    var request = "/propietat";

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

        {/* Taula que mostra una propietat per cada row */}
        <table  className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>ID Propietats</th>
                    <th>Nom Propietat</th>
                  </tr>
                </thead>
                <tbody>
                  {propietats.map(function(propietats, key) {
                        return (
                          <tr key = {key}>
                              <td>{propietats.idPropietat}</td>
                              <td>{propietats.nom_propietat}</td>
                          </tr>
                        )
                      })}
                </tbody>
        </table>

        <Container>
          <Row>
            <Col>

            {propietats.map(function(propietats, key) {
                          return (

                            <Propietat key = {key}
                            title = "Hola"
                            subtitle = {propietats.nom_propietat}
                            text="Descripció llarga 1" 
                            photo="https://picsum.photos/200/200?image=10"
                            url="http://www.mylink1.com" />

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