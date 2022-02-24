//Importam els components per utilitzar la interficie component
import { Component } from 'react';

//Importar un component de Bootstrap.
import {Button, Row, Col, Label, Form, Input, FormGroup} from 'reactstrap';

import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const holidays = [
    new Date("2022-02-22"),
    new Date("2022-02-21")
  ];



class DadesPropietat extends Component {

    constructor(props) {
        super(props);
    
          this.state = {
            dataEntrada: new Date(),
            dataSortida: new Date()
            
          };
      }



    actualitzarDataEntrada=date=>{
        
        this.setState({dataEntrada: date})
    }

    actualitzarDataSortida=date=>{
        this.setState({dataSortida: date})
    }

  render(){

  
    

    return (

        <Row className='colsInfo'>
            <Col xs="3" className="mt-4">

                    <Form className='mt-5 text-start  d-flex flex-column justify-content-center'>
                        <FormGroup>
                            <DayPicker />
                            <Label for="dEntrada" className='fw-bold'>Data d'entrada</Label>
                            <DatePicker 
                            className='inputDate text-center fs-5'
                            selected={this.state.dataEntrada}
                            onChange={this.actualitzarDataEntrada}
                            excludeDateIntervals={[{start: new Date("2022-02-25"), end: new Date("2022-02-28") }, {start: new Date("2022-02-10"), end: new Date("2022-02-15") }]}
                            showMonthDropdown
                            monthsShown={2}
                            
                            > 
                            <div className='text-center mb-1'>Recorda a comprovar els dies!</div>
                            </DatePicker> 
                            
                        </FormGroup>
                        <FormGroup>
                            <Label for="dSortida" className='fw-bold'>Data de sortida</Label>
                            <DatePicker 
                            className='inputDate text-center fs-5' 
                            selected={this.state.dataSortida} 
                            onChange={this.actualitzarDataSortida}
                            excludeDates={holidays}
                            showTimeSelect
                            dateFormat="MMMM d, yyyy h:mm aa"
                            minDate={this.state.dataEntrada}
                            > 
                            <div className='text-center mb-1'>Recorda a comprovar els dies!</div>
                            </DatePicker>
                        </FormGroup>
                        <FormGroup>
                            <Label for="preuFinal" className='text-start fw-bold'>Preu Final</Label>
                            <Input type="number" className='inputDate' step="any" name="preuFinal" id="preuFinal" bsSize='lg' readOnly />
                        </FormGroup>
                      
    
                        <Button color="outline-dark" className='text-center fs-5 fw-bold inputDate mt-3 mb-3'>Llogar</Button>
                        
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
                    <p>
                        {this.props.caracteristiques.map(function(caracteristica,key) {
                        return(
                            <span className='me-2' key= {key}>
                            {caracteristica.caracteristica}
                            &nbsp;&nbsp;&nbsp;&nbsp;</span>
                        )
                        })}
                    </p>
                    </Col>

                </Row>

                <Row className='subRowDades mb-3'>

                    <Col className='colNormes'>
                    <p className='text-start fw-bold'>Normes de la casa:</p>
                    <p>{this.props.text}</p>
                    </Col>

                </Row>

            </Col>
        </Row>

    );
  }
}

export default DadesPropietat;