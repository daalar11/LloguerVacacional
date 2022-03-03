// -- COMPONENTS IMPORTS --
import React, { Component } from 'react';

//Importar un component de Bootstrap.
import {Button, Row, Col, Form, Input} from 'reactstrap';

import Comentari from './Comentari';
import InputComentari from './InputComentari';

class Comentaris extends Component {

    constructor(props) {
        super(props)
    }
    
    // -- COMENÇA EL METODE RENDER
    render() {

    const coms  = this.props.comentaris;
   
    // -- RETURN DEL METODE RENDER
    return (

            <Row className='rowComentaris'>
                <Col xs="12" className="colComentaris">

                    <Row>
                        <Col xs="12" className='text-start fw-bold mt-2'>Secció de Comentaris</Col>
                    </Row>

                    <hr></hr>

                    {/* Component Capsa de Comentaris */}
                    {coms.map(function(comentari, key) {
                          
                          return (
                            <Comentari key = {key}
                            text={comentari.pivot.comentari}
                            data={comentari.pivot.data_comentari}
                            neteja={comentari.pivot.nota_neteja}
                            ubicacio={comentari.pivot.nota_localitzacio}
                            estada={comentari.pivot.nota_accesibilitat}
                            client={comentari.pivot.id_cli}
                            />
                          )
                    })}

                    <hr></hr>
                    <Row>
                        <Col xs="12" className='comentariHeader fw-bold'>
                            Has estat a la propietat? Deixa la teva review per tal d'ajudar als futurs inquilins!
                        </Col>
                        <InputComentari />
                        
                    </Row> 

                </Col>
            </Row>
      
      
    );//FI DEL RETURN DEL RENDER
  }//FI DEL RENDER
}//FI DEL COMPONENT

export default Comentaris;// - Export del component