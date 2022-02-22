// -- COMPONENTS IMPORTS --
import React, { Component } from 'react';

//Importar un component de Bootstrap.
import {Button, Row, Col, Label, Form, Input, FormGroup} from 'reactstrap';

import Comentari from './Comentari';

class Comentaris extends Component {

  // -- COMENÇA EL METODE RENDER
  render() {

    // -- RETURN DEL METODE RENDER
    return (

            <Row className='rowComentaris'>
                <Col xs="12" className="colComentaris">

                    <Row>
                        <Col xs="12" className='text-start fw-bold mt-2'>Secció de Comentaris</Col>
                    </Row>

                    <hr></hr>

                    {/* Components Comentaris */}
                    <Comentari />
                    <Comentari />

                    <hr></hr>
                    <Row>
                        <Col xs="12" className='comentariHeader fw-bold'>
                            Has estat a la propietat? Deixa la teva review per tal d'ajudar als futurs inquilins!
                        </Col>
                        <form onSubmit="false">
                            <Col xs="12">
                                <div class="form-group mb-2 mt-2">
                                    
                                    <textarea class="form-control" id="textComentari" rows="3"></textarea>
                                    
                                </div>                                  
                                <Row>
                                    <Col xs="4" className='text-start fw-bold'>Valora de 1 a 10 la propietat</Col>
                                    <Col>
                                        <div class="input-group input-group-sm mb-3">
                                            <span class="input-group-text" id="basic-addon1">Ubicació</span>
                                            <input type="number" class="form-control" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div class="input-group input-group-sm mb-3">
                                            <span class="input-group-text" id="basic-addon1">Estada</span>
                                            <input type="number" class="form-control" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div class="input-group input-group-sm mb-3">
                                            <span class="input-group-text" id="basic-addon1">Neteja</span>
                                            <input type="number" class="form-control" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </Col>
                                    <Col xs="3">
                                    <button type="submit" class="btn btn-outlined-primary">Submit</button>
                                
                                    </Col>
                                    
                                </Row>
                                
                            </Col>
                        </form>
                    </Row>
                    

                </Col>
            </Row>
      
      
    );//FI DEL RETURN DEL RENDER
  }//FI DEL RENDER
}//FI DEL COMPONENT

export default Comentaris;// - Export del component