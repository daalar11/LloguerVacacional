import React, { Component } from "react";
import CasesList from "../components/casesList";
import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap
import Propietat from '../components/Propietat';
import {Container, Row, Col } from 'reactstrap';
import Places from "../components/Places";
import ListCaracateristica from "../components/ListCaracteristica";
//Importam Axios
import axios from 'axios';
import SelectLocalitat from "../components/SelectLocalitat";

class Cercarpropietat extends Component {

  constructor(props) {
    super(props);

    this.state = {
      localitat:  [],
      caracteristica: [],
      propietats: [],

      categoriaFiltrada: [],
      places:null,
      localitatFiltrada : null,

      isLoading: false,
      error: null,
    };

    this.changeCaracteristica= this.changeCaracteristica.bind(this);
    this.changeLocalitat=this.changeLocalitat.bind(this);
    this.changePlaces=this.changePlaces.bind(this);
  }

  changeLocalitat(l){
    this.setState({localitatFiltrada : l});
  }
  changePlaces(p){
    this.setState({places : p});
  }
  
  changeCaracteristica(myCaracteristica ){
    this.setState({categoriaFiltrada : myCaracteristica});
 
  }
  //Metode amb la peticio axios a n url.

  carregarLocalitat = () => {

    //var url="api.lloguerdavid.me";
    var url = "http://127.0.0.1:8000";
    var request = "/localitats";

    axios.get(url + request)
    .then(res => {this.setState({
      localitat: res.data,
          status: true
        });
    })
    .catch(error => this.setState({
      error,
      isLoading: false
    }));
  }

  carregarCaracteristica = () => {

    //var url="api.lloguerdavid.me";
    var url = "http://127.0.0.1:8000";
    var request = "/caracteristica";

    axios.get(url + request)
    .then(res => {this.setState({
      caracteristica: res.data,
          status: true
        });
    })
    .catch(error => this.setState({
      error,
      isLoading: false
    }));
  }
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
  componentDidMount = () => {
    this.carregarPropietats();
    this.carregarCaracteristica();
    this.carregarLocalitat();}

  render() {

    const { propietats, isLoading, error,localitat,caracteristica } = this.state;

  
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
            <Col className="col-4">
               <Places handleChange={this.changePlaces}></Places>
            </Col>
            <Col className="col-4">
               <SelectLocalitat 
               handleChange={this.changeLocalitat}
                localitat={localitat}>

               </SelectLocalitat>
            </Col>
          </Row>
          <Row>
            <Col className="col-4">
                <ListCaracateristica 
                handleChange={this.changeCaracteristica} 
                caracteristica={caracteristica}>
                </ListCaracateristica>
            </Col>
            <Col className="col-8">
            
            <CasesList
            propietats={propietats}
            places={this.state.places}
            localitat={this.state.localitatFiltrada}>

            </CasesList>
                     
            </Col>
                  
          </Row>
        </Container>
 
        
      </div>
    );
  }
}
 
export default Cercarpropietat;