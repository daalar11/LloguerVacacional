// -- COMPONENTS IMPORTS --
import React, { Component } from 'react';

//Importar un component de Bootstrap.
import {Row, Col} from 'reactstrap';

import Comentari from './Comentari';
import InputComentari from './InputComentari';

import {UserContext} from '../App.js';

import { withTranslation } from 'react-i18next';

class Comentaris extends Component {

    constructor(props) {
        super(props)
    }
    
    // -- COMENÇA EL METODE RENDER
    render() {

    const coms  = this.props.comentaris;

    // -- RETURN DEL METODE RENDER
    return (

            <Row>
                <Col xs="12" className="colComentaris">

                    <Row>
                        <Col xs="12" className='text-start fw-bold mt-2'>{this.props.t('viewpropietat.titlecom')}</Col>
                    </Row>

                    <hr></hr>

                    {coms.length == 0 &&
                        <p className='fw-bold'>{this.props.t('viewpropietat.noComent')}</p>
                    }

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
                    
                    {/* Aixo es l'input del comentari, com que el component necessita acedir al contexte li proporcionam acces */}
                    <UserContext.Consumer>
                    {(idUsuariLogeat) => (
                    <InputComentari idClient={idUsuariLogeat} />
                    )}
                    </UserContext.Consumer>
                    
                </Col>
            </Row>
      
    );//FI DEL RETURN DEL RENDER
  }//FI DEL RENDER
}//FI DEL COMPONENT

export default withTranslation()(Comentaris);// - Export del component