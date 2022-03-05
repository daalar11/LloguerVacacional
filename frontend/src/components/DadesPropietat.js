//Importam els components per utilitzar la interficie component
import { Component } from 'react';
import React from "react";

//Importar un component de Bootstrap.
import {Button, Row, Col, Label, Form, FormGroup, Collapse, CardBody, Card, CardHeader } from 'reactstrap';

import DayPicker from "./DayPicker";
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

import axios from 'axios';

 

class DadesPropietat extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          collapse: 0, 
          cards: [1],
          diesNoDisponibles: [],
          isLoading: false,
          error: null,
        };
      }

    getDiesNoDisponibles = () => {

        //Agafam el parametres de la URL d'aquesta forma. (No fa falta instalar cap packet, ve a javascript intern)
 const queryParams = new URLSearchParams(window.location.search);
 const id = queryParams.get('id');
 const url = "http://127.0.0.1:8000"

    var request = "/propietat/" + id + "/nodisponible/info";
    
    axios.get(url + request)
    .then(res => {this.setState({
        diesNoDisponibles: res.data,
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
    this.getDiesNoDisponibles();
  }
  
    toggle(e) {
        let event = e.target.dataset.event;
        this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
    }

  render(){

    const {cards, collapse, isLoading, error, diesNoDisponibles} = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    //Funcio que retorna Si si el valor es 1 i No si el valor es 0
    function parseValueBany(n) {
        if (n === 1){
            return "Sí";
        } else {
            return "No";
        }
    } 
    const FORMAT = 'dd-MM-yyyy';

    return (

        <Row className='d-flex justify-content-between p-2'>
            <Col xs="3" className='mt-1'>

                    <Form className='mt-5 text-start  d-flex flex-column justify-content-center' action='/reservar'>

                        <span className='fw-bold'>Estableix les dates de la teva estada</span>
                        <hr></hr>
                        <Label className='text-start fw-bold'>Data Entrada</Label>

                        {/* Input data entrada */}
                        <DayPicker 
                        placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                        diesNoDisponibles={diesNoDisponibles}
                        />
                     
                        <Label className='text-start fw-bold mt-4'>Data Sortida</Label>

                        {/* Input data sortida */}
                        <DayPicker 
                        placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                        diesNoDisponibles={diesNoDisponibles}
                        />
                    
                    
                        <span className='text-start fw-bold mt-4'>Preu: <span className='ms-2 text-danger' id='preu'>714€</span></span>
                        <input type='submit' color="dark" className='mt-4 fw-bold bg-dark text-white rounded' value="Llogar" />
                        
                    </Form>

                    <p className='text-start text-black-75 mt-4'>
                        Selecciona els dies que desitjaries llogar la propietat per coneixer el preu de l'estada.<br></br><br></br>
                        Clica llogar per anar a la pantalla de la teva reserva
                    </p>
          
            </Col>
            <Col xs="8" className="colDades">

                <Row className='subRowDades mt-2'>
                    <Col className='mt-5'>
                        <h4 className='text-start'>{this.props.title}</h4>
                    </Col>
                    <hr></hr>
                </Row>

                <Row className='subRowDades'>
                    <Col>
                        <Row className='rowDada'>
                            <Col xs="6" className='colDada fw-bold'>Direcció:</Col>
                            <Col xs="5" className='colDada'>{this.props.direccio}</Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row className='rowDada'>
                            <Col xs="6" className='colDada fw-bold'>Localitat:</Col>
                            <Col xs="5" className='colDada'>{this.props.localitat}</Col>
                        </Row>
                    </Col>

                </Row>
                <Row className='subRowDades'>

                    <Col>
                        <Row className='rowDada'>
                            <Col xs="6" className='colDada fw-bold'>Nº Plaçes:</Col>
                            <Col xs="5" className='colDada'>{this.props.plases}</Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row className='rowDada'>
                            <Col xs="6" className='colDada fw-bold'>Nº Habitacions:</Col>
                            <Col xs="5" className='colDada'>{this.props.numeroHabitacions}</Col>
                        </Row>
                    </Col>

                </Row>

                <Row className='subRowDades'>

                    <Col>
                        <Row className='rowDada'> 
                            <Col xs="6" className='colDada fw-bold'>Nº Banys: </Col>
                            <Col xs="5" className='colDada'>{this.props.banys}</Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row className='rowDada'>
                            <Col xs="6" className='colDada fw-bold'>Preu Base/Dia:</Col>
                            <Col xs="5" className='colDada'>{this.props.preu}€</Col>
                        </Row>
                    </Col>

                </Row>

                <Row className='subRowDades'>

                    <Col>
                        <Row className='rowDada'>
                            <Col xs="6" className='colDada fw-bold'>Descompte Setmana:</Col>
                            <Col xs="5" className='colDada'>{this.props.dsetmana}%</Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row className='rowDada'>
                            <Col xs="6" className='colDada fw-bold'>Descompte Més:</Col>
                            <Col xs="5" className='colDada'>{this.props.dmes}%</Col>
                        </Row>
                    </Col>

                </Row>

                <Row className='subRowDades'>

                    <Col className='colNormes'>
                    <p className='text-start fw-bold'>Caracteristiques</p>
                    <div className='mt-4 d-flex'>
        
                        {/* Si la propietat no te caracteristiques es displayara el seguent paragraf */}
                        {this.props.caracteristiques.length == 0 &&
                            <p>El propietari no ha definit cap caracteristica</p>
                        }

                        {this.props.caracteristiques.map(function(caracteristica,key) {
                        return(
                            <span className='me-2 p-2 text-center' key= {key}>
                            {caracteristica.caracteristica}
                            </span>
                        )
                        })}
                    </div>
                    </Col>

                </Row>

                <Row className='subRowDades mb-3'>

                    <Col className='colNormes'>
                    <p className='text-start fw-bold'>Normes de la casa:</p>
                    <p>{this.props.text}</p>
                    </Col>

                </Row>

                {/* Accordion Habitacions de la propietat */}
                <Row className='subRowDades'>

                        {cards.map(index => {
                        return (
                            <Card key={index} style={{padding: 0}} >
                                <CardHeader
                                    className='text-start fw-bold'
                                    onClick={this.toggle}
                                    data-event={index}>Habitacions {collapse === index?'-':'+'
                                }
                                </CardHeader>
                                <Collapse isOpen={collapse === index}>
                                <CardBody>

                                    <ul>

                                    {this.props.habitacions.map(function(habitacio, key) {
                                        return (
                                            <li className='p-3 text-start' key = {key}>Habitació {key+1} - Bany: {parseValueBany(habitacio.bany)} / Nº Llits Dobles: {habitacio.llit_doble} / Nº Llits Individuals: {habitacio.llit_simple}</li>
                                        );
                                    })}

                                    </ul>

                                </CardBody>
                                </Collapse>
                            </Card>
                        )
                    })}     
       
                </Row>

            </Col>
        </Row>

    );
  }
}

export default DadesPropietat;