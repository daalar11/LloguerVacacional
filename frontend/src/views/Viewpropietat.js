import React, { Component } from "react";

//Imports dels altres components fills
import Carrousel from "../components/Carrousel";
import Mapa from "../components/Mapa";
import DadesPropietat from "../components/DadesPropietat";
import Comentaris from "../components/CapsaComentaris";

import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap

//Css de ViewPropietat
import '../components/PropietatExpand.css';

//Importar components de Bootstrap.
import {Container, Row, Col} from 'reactstrap';

import axios from 'axios';
 
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
  propietatById = () => {

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
  componentDidMount = () => {this.propietatById();
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
        <Row className='contenidor'>
          <Col>

              {/* Titol amb el nom de la propietat */}
              <Row>
                  <h3 className='text-center'>Nom de la Propietat</h3>
              </Row>
              <hr></hr>

              {/* Component Carrousel */}
              <Carrousel />

              {/* Component DadesPropietat amb tota la info de la casa */}
              <DadesPropietat />

              {/* Component Mapa Localització propietat*/}
              <Mapa />
              
              {/* Component Capsa de Comentaris */}
              <Comentaris />


          </Col> 
        </Row>
      </Container>
    );
    
    
  }
}
 
export default Viewpropietat;