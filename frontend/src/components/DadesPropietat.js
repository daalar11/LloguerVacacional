import React, { Component } from 'react';
import CapsaReserva from './CapsaReserva';
import {Row, Col, Collapse, CardBody, Card, CardHeader } from 'reactstrap';
import { withTranslation } from 'react-i18next';

class DadesPropietat extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          collapse: 0, 
          cards: [1],
        };
      }
  
    toggle(e) {
        let event = e.target.dataset.event;
        this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
    }

  render(){

    const {cards, collapse, isLoading, error} = this.state;

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
  
    return (

        <Row className='d-flex justify-content-between p-2'>
            
            <CapsaReserva />

            <Col xs="8" className="d-flex justify-content-between flex-nowrap flex-column">

                <Row>
                    <Col className='mt-5'>
                        <h4 className='text-start'>{this.props.title}</h4>
                    </Col>
                    <hr></hr>
                </Row>

                <Row>
                    <Col>
                        <Row className='rowDada'>
                            <Col xs="6" className='colDada fw-bold'>{this.props.t('viewpropietat.direccio')} </Col>
                            <Col xs="5" className='colDada'>{this.props.direccio}</Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row className='rowDada'>
                            <Col xs="6" className='colDada fw-bold'>{this.props.t('viewpropietat.localitat')}</Col>
                            <Col xs="5" className='colDada'>{this.props.localitat}</Col>
                        </Row>
                    </Col>

                </Row>
                <Row>

                    <Col>
                        <Row className='rowDada'>
                            <Col xs="6" className='colDada fw-bold'>{this.props.t('viewpropietat.plases')} </Col>
                            <Col xs="5" className='colDada'>{this.props.plases}</Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row className='rowDada'>
                            <Col xs="6" className='colDada fw-bold'>{this.props.t('viewpropietat.habitacions')} </Col>
                            <Col xs="5" className='colDada'>{this.props.numeroHabitacions}</Col>
                        </Row>
                    </Col>

                </Row>

                <Row>

                    <Col>
                        <Row className='rowDada'> 
                            <Col xs="6" className='colDada fw-bold'>{this.props.t('viewpropietat.banys')} </Col>
                            <Col xs="5" className='colDada'>{this.props.banys}</Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row className='rowDada'>
                            <Col xs="6" className='colDada fw-bold'>{this.props.t('viewpropietat.preudia')} </Col>
                            <Col xs="5" className='colDada'>{this.props.preu}€</Col>
                        </Row>
                    </Col>

                </Row>

                <Row>

                    <Col>
                        <Row className='rowDada'>
                            <Col xs="6" className='colDada fw-bold'>{this.props.t('viewpropietat.descomptes')} </Col>
                            <Col xs="5" className='colDada'>{this.props.dsetmana}%</Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row className='rowDada'>
                            <Col xs="6" className='colDada fw-bold'>{this.props.t('viewpropietat.descomptem')} </Col>
                            <Col xs="5" className='colDada'>{this.props.dmes}%</Col>
                        </Row>
                    </Col>

                </Row>

                <Row>

                    <Col className='mt-2'>
                    <p className='text-start fw-bold'>{this.props.t('viewpropietat.caract')} </p>
                    <div className='mt-4 d-flex'>
        
                        {/* Si la propietat no te caracteristiques es displayara el seguent paragraf */}
                        {this.props.caracteristiques.length == 0 &&
                            <p>{this.props.t('viewpropietat.errorCar')}</p>
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

                <Row className='mb-3'>

                    <Col className='text-start'>
                    <p className='fw-bold'>{this.props.t('viewpropietat.normes')}</p>
                    <p>{this.props.text}</p>
                    </Col>

                </Row>

                {/* Accordion Habitacions de la propietat */}
                <Row>

                        {cards.map(index => {
                        return (
                            <Card key={index} style={{padding: 0}} >
                                <CardHeader
                                    className='text-start fw-bold'
                                    onClick={this.toggle}
                                    data-event={index}>{this.props.t('viewpropietat.hab')} {collapse === index?'-':'+'
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

export default withTranslation()(DadesPropietat);