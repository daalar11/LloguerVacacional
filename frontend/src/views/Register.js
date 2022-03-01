// -- COMPONENTS IMPORTS --
import { Component } from 'react';

//Imports Reactstrap
import {Row, Col, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupText} from 'reactstrap';
import {Link} from "react-router-dom";

//Css de ViewPropietat
import '../components/PropietatExpand.css';

class Register extends Component {

  // -- COMENÇA EL METODE RENDER
  render() {

    // -- RETURN DEL METODE RENDER
    return (
      
        <Row className='pt-5'>

            <Col xs="2" />
        
            <Col xs="8" className='login rounded mt-5 shadow-lg p-3 mb-5'>
            
                <h4 className='text-center mt-5 mb-3'>Registre</h4>
                <Form className='p-4 text-start  d-flex flex-column justify-content-center' action="/login">

                    <Row>

                        <Col xs="6">
                            <FormGroup>
                                <Label className='text-start fw-bold'>DNI</Label>
                                <Input 
                                type="text"
                                placeholder="XXXXXXXXA"
                                />   
                            </FormGroup>

                            <FormGroup>
                                <Label className='text-start fw-bold'>Primer Llinatge </Label>
                                <Input 
                                type="text"
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label className='text-start fw-bold'>Contrassenya</Label>
                                <Input 
                                type="password"
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="6">

                            <FormGroup>
                                <Label for="preuFinal" className='text-start fw-bold'>Nom</Label>   
                                <Input 
                                type="text"
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label className='text-start fw-bold'>Segon Llinatge</Label>
                                <Input 
                                type="text"
                                />  
                            </FormGroup>

                            <FormGroup>
                                <Label className='text-start fw-bold'>Repeteix la contrassenya</Label>
                                <Input 
                                type="password"
                                />      
                            </FormGroup>
                        
                        </Col>

                        <FormGroup>

                            <Label className='text-start fw-bold'>Correu electrònic</Label>
                            <InputGroup>
                                <InputGroupText>
                                    @
                                </InputGroupText>
                                <Input 
                                type="email"
                                placeholder="example@gmail.com"
                                />
                            </InputGroup> 
                           
                        </FormGroup>
                    
                        
                    </Row>
                    
                    <Button color="outline-dark" className='text-center fw-bold inputDate mt-3 mb-3'>Register</Button>
                    
                </Form>
                Ja tens un compte? <Link to="/login">Inicia Sessió!</Link>
    
            </Col>
            <Col xs="2"/>

        </Row>

    );//FI DEL RETURN DEL RENDER
  }//FI DEL RENDER
}//FI DEL COMPONENT

export default Register;// - Export del component