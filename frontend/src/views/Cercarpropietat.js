import React, { Component } from "react";
import CasesList from "../components/casesList";
import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap
import Propietat from '../components/Propietat';
import {Container, Row,Card, Col, Breadcrumb, BreadcrumbItem,Collapse,AccordionItem,AccordionHeader,UncontrolledAccordion, CardHeader, CardBody} from 'reactstrap';
import Places from "../components/Places";
import ListCaracateristica from "../components/ListCaracteristica";
//Importam Axios
import axios from 'axios';
import SelectLocalitat from "../components/SelectLocalitat";

import {Link} from "react-router-dom";

import ReactPaginate from 'react-paginate';


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

      collapse: 0, 
          cards: [1],
    };
    this.toggle = this.toggle.bind(this);
    this.changeCaracteristica= this.changeCaracteristica.bind(this);
    this.changeLocalitat=this.changeLocalitat.bind(this);
    this.changePlaces=this.changePlaces.bind(this);
  }
  toggle(e) {
    let event = e.target.dataset.event;
    this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
}
  changeLocalitat(l){
    this.setState({localitatFiltrada : l});
  }
  changePlaces(p){
    this.setState({places : p});
  }
  
  async changeCaracteristica(myCaracteristica ){
    await    this.setState({categoriaFiltrada : myCaracteristica});
    //console.log(myCaracteristica,"algo");
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
    .then(res => 
      {
                  this.setState({
                    propietats: res.data,
                        status: true,
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
    this.carregarLocalitat();
    
  }
    

  render() {

    const { propietats, isLoading, error,localitat,caracteristica,collapse,cards } = this.state;
    console.log(this.state.propietats);
  
    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      
      <div>

        <Container>

        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            Cercar Propietat
          </BreadcrumbItem>
        </Breadcrumb>

          <Row>
          <hr></hr>
            <Col xs="12" xl="4" className=" mt-2 border border-2 rounded">
            {cards.map(index => {
              return(
              <Card key={index}>
                   
                  <CardHeader onClick={this.toggle}
                                 data-event={index}     >
                    Filtratges
                  </CardHeader>
                  <Collapse isOpen={collapse === index}>
                    <CardBody>
                  <Row>
                    <Places handleChange={this.changePlaces}></Places>
                  </Row>
                  <Row>
                    <SelectLocalitat 
                    handleChange={this.changeLocalitat}
                    localitat={localitat}>

                    </SelectLocalitat>
                  </Row>
                  <Row>
                      <ListCaracateristica 
                      handleChange={this.changeCaracteristica} 
                      caracteristica={caracteristica}>
                      </ListCaracateristica>
                    </Row>
                    </CardBody>
                    </Collapse>
                    
                </Card>
                  )
                 })} 
            </Col>
            <Col xl="8"xs="12">
            
            <CasesList
            propietats={propietats}
            places={this.state.places}
            localitat={this.state.localitatFiltrada}
            caracteristica={this.state.categoriaFiltrada}>

            </CasesList>
                     
            </Col>
                  
          </Row>
         
            <div>
              
            </div>

        </Container>
 
        
      </div>
    );
  }
}
 
export default Cercarpropietat;