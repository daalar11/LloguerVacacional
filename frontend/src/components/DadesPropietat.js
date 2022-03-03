//Importam els components per utilitzar la interficie component
import { Component } from 'react';
import React from "react";

//Importar un component de Bootstrap.
import {Button, Row, Col, Label, Form, FormGroup, Collapse, CardBody, Card, CardHeader } from 'reactstrap';

import DayPicker from "./DayPicker";
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

class DadesPropietat extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          collapse: 0, 
          cards: [1]
        };
      }
  
    toggle(e) {
        let event = e.target.dataset.event;
        this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
    }

  render(){

    const {cards, collapse} = this.state;

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

        <Row className='colsInfo'>
            <Col xs="3" className='mt-1'>

                    <Form className='mt-5 text-start  d-flex flex-column justify-content-center' action='/reservar'>
                    <span for="dEntrada" className='fw-bold'>Estableix les dates de la teva estada</span>
                    <hr></hr>
                        <FormGroup>
                            <Label className='text-start fw-bold'>Data Entrada</Label>
                            <DayPicker 
                            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                            /> 
                        </FormGroup>
                        <FormGroup>
                            <Label className='text-start fw-bold'>Data Sortida</Label>
                            <DayPicker />
                        </FormGroup>
                        <FormGroup>
                            <Label for="preuFinal" className='text-start fw-bold'>Preu Final</Label>
                            <p className='pPreuFinal'></p>
                        </FormGroup>
    
                        <input type='submit' color="outline-dark" className='text-center fs-5 fw-bold inputDate mt-3 mb-3' value="Llogar" />
                        
                    </Form>
          
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