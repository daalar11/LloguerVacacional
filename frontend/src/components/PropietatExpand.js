//Importam el css
import './PropietatExpand.css';

//Importam els components per utilitzar la interficie component
import { Component } from 'react';

//Importar un component de Bootstrap.
import {Button, Row, Col, Label, Form, Input, FormGroup} from 'reactstrap';


import Carrousel from "../components/Carrousel";
import Mapa from "./Mapa";


class PropietatExpand extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
         
        };
      }

  render(){

    const titol = (this.props);
  
    return (
      
        <Row className='contenidor'>
            <Col>
                <Row className='p-2'>
                    <h3 className='text-center'>Nom de la Propietat</h3>
                </Row>
                <Row>
                    <Carrousel />
                </Row>
            
                <Row className='colsInfo'>
                    <Col xs="3" className="colDades">

                        <Row className='mt-5'>
                            <Form>
                                <FormGroup>
                                    <Label for="dEntrada" className='text-start fw-bold'>Data d'entrada</Label>
                                    <Input type="date" name="dEntrada" id="dEntrada" bsSize='lg' />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="dSortida" className='text-start fw-bold'>Data de sortida</Label>
                                    <Input type="date" name="dSortida" id="dSortida" bsSize='lg' />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="preuFinal" className='text-start fw-bold'>Preu Final</Label>
                                    <Input type="number" step="any" name="preuFinal" id="preuFinal" bsSize='lg' />
                                </FormGroup>
            
                                <Button color="outline-dark" className='text-start fw-bold'>Llogar</Button>
                                
                            </Form>
                        </Row>

                    </Col>
                    <Col xs="8" className="colDades">

                        <Row className='subRowDades'>
                            <Col className='mt-5'>
                               <h4 className='text-start'>Villa Playa</h4>
                            </Col>
                            <hr></hr>
                        </Row>

                        <Row className='subRowDades'>
                            <Col>
                                <Row className='rowDada'>
                                    <Col xs="6" className='colDada fw-bold'>Direcció:</Col>
                                    <Col xs="5" className='colDada'>Major 50</Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row className='rowDada'>
                                    <Col xs="6" className='colDada fw-bold'>Localitat:</Col>
                                    <Col xs="5" className='colDada'>Artà</Col>
                                </Row>
                            </Col>

                        </Row>
                        <Row className='subRowDades'>

                            <Col>
                                <Row className='rowDada'>
                                    <Col xs="6" className='colDada fw-bold'>Plaçes:</Col>
                                    <Col xs="5" className='colDada'>4</Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row className='rowDada'>
                                    <Col xs="6" className='colDada fw-bold'>Habitacions:</Col>
                                    <Col xs="5" className='colDada'>2</Col>
                                </Row>
                            </Col>

                        </Row>

                        <Row className='subRowDades'>

                            <Col>
                                <Row className='rowDada'> 
                                    <Col xs="6" className='colDada fw-bold'>Nª Banys: </Col>
                                    <Col xs="5" className='colDada'>3</Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row className='rowDada'>
                                    <Col xs="6" className='colDada fw-bold'>Preu Base:</Col>
                                    <Col xs="5" className='colDada'>54€</Col>
                                </Row>
                            </Col>

                        </Row>

                        <Row className='subRowDades'>

                            <Col>
                                <Row className='rowDada'>
                                    <Col xs="6" className='colDada fw-bold'>Descompte Setmana:</Col>
                                    <Col xs="5" className='colDada'>3%</Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row className='rowDada'>
                                    <Col xs="6" className='colDada fw-bold'>Descompte Setmana:</Col>
                                    <Col xs="5" className='colDada'>3%</Col>
                                </Row>
                            </Col>

                        </Row>

                        <Row className='subRowDades mb-3'>

                            <Col className='colNormes'>
                            <p className='text-start fw-bold'>Normes de la casa:</p>
                            <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.</p>
                            </Col>

                        </Row>

                    </Col>
                </Row>

                <Row className='rowComentaris'>
                    <Col>
                        <Mapa />
                    </Col>
                </Row>

                <Row className='rowComentaris'>
                    <Col xs="12" className="colComentaris">

                        <Row>
                            <Col xs="12" className='text-start fw-bold mt-2'>Secció de Comentaris</Col>
                        </Row>
                        <hr></hr>
                        <Row>
                            <Col xs="12" className='comentariHeader'>
                                <span className='text-start'>Autor: Aleix Font</span>
                                <span className='text-end'>Data: 21/02/2022</span>
                            </Col>
                            <Col xs="12"></Col>
                        </Row>

                    </Col>
                </Row>
            
            
            </Col> 
        </Row>

    );
  }
}

export default PropietatExpand;