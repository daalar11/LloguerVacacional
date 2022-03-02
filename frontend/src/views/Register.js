// -- COMPONENTS IMPORTS --
import { Component } from 'react';

//Imports Reactstrap
import {Row, Col, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupText} from 'reactstrap';
import {Link} from "react-router-dom";

//Css de ViewPropietat
import '../components/PropietatExpand.css';

import FormRegister from "../components/FormRegister";

class Register extends Component {

    

  // -- COMENÇA EL METODE RENDER
  render() {



    // -- RETURN DEL METODE RENDER
    return (
      
        <Row className='pt-5'>

            <Col xs="2" />
        
            <Col xs="8" className='login rounded mt-5 shadow-lg p-3 mb-5'>
            
                <h4 className='text-center mt-5 mb-3'>Registre</h4>
                <FormRegister />
                Ja tens un compte? <Link to="/login">Inicia Sessió!</Link>
    
            </Col>
            <Col xs="2"/>

        </Row>

    );//FI DEL RETURN DEL RENDER
  }//FI DEL RENDER
}//FI DEL COMPONENT

export default Register;// - Export del component