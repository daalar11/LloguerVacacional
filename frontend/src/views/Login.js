// -- COMPONENTS IMPORTS --
import { Component } from 'react';

//Imports Reactstrap
import {Row, Col, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupText} from 'reactstrap';
import {Link} from "react-router-dom";

//Css de ViewPropietat
import '../components/PropietatExpand.css';

class Login extends Component {

  // -- COMENÇA EL METODE RENDER
  render() {

    // -- RETURN DEL METODE RENDER
    return (
      
      <Row className='pt-5'>

        <Col xs="3" />
      
        <Col xs="6" className='login rounded mt-5 shadow-lg p-3 mb-5'>
        
          <h4 className='text-center mt-5 mb-3'>Inicia Sessió</h4>
          <Form className='p-4 text-start  d-flex flex-column justify-content-center' action="/">
            
            <FormGroup>
                <Label className='text-start fw-bold'>Correu Electronic</Label>
                <InputGroup>
                  <InputGroupText>
                    @
                  </InputGroupText>
                  <Input 
                  type="email"
                  placeholder="example@gmail.com" />
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <Label for="preuFinal" className='text-start fw-bold'>Contrassenya</Label>
                <InputGroup>
                  <InputGroupText className='pe-3'>
                    #
                  </InputGroupText>
                  <Input 
                  type="password"
                  />
                </InputGroup>
            </FormGroup>

            <Button color="outline-dark" className='text-center fw-bold inputDate mt-3 mb-3'>Log In</Button>
                
          </Form>
          No estas registrat? <Link to="/register">Registret!</Link>
  
        </Col>
        <Col xs="3"/>

      </Row>

    );//FI DEL RETURN DEL RENDER
  }//FI DEL RENDER
}//FI DEL COMPONENT

export default Login;// - Export del component