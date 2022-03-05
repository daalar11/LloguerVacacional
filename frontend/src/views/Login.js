//Css de ViewPropietat
import '../components/PropietatExpand.css';

import React, {useState} from "react";
import { useForm } from "react-hook-form";

import {Link} from "react-router-dom";

import {Row, Col, Form, FormGroup, Label, Input} from 'reactstrap';

import axios from 'axios';

function Login() {

  const error = useState(0);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => axios.post('http://localhost:8000/login', {

    correu: data.correu,
    contrasenya: data.contrasenya,
    
  }).then(function (response){

    //Si les creedencials son correctes i s'inicia sessió
    if (response.data[0] == 0){
    
        sessionStorage.setItem("idUsuariLogeat", response.data[2].id)
        window.location.href = "http://localhost:3000/";
        
    } 
    //En el cas de que l'usuari no existeixi
    if (response.data[0] == 1) {
        alert(response.data[1]);
    } 
    //En cas de que la contrassenya sigui incorrecte
    if (response.data[0] == 2) {
      alert(response.data[1]);
  }}).catch(err => console.log(err))

  

  return (

    <Row className='pt-5'>

        <Col xs="3" />
      
        <Col xs="6" className='login rounded mt-5 shadow-lg p-3 mb-5'>
        
          <h4 className='text-center mt-5 mb-3'>Inicia Sessió</h4>
          <Form className='p-4 text-start  d-flex flex-column justify-content-center' action="/" onSubmit={handleSubmit(onSubmit)}>
            <FormGroup className='fr'>
                <Label className='text-start fw-bold'>Correu Electronic</Label>
               
                  <input 
                  {...register("correu", {
                    required: true,
                 
                  })}
                  type="email"
                  placeholder="example@gmail.com"
                  id = "correu"
                  name='correu'
                  />
                  {errors.correu && <span className="text-danger">Introdueix el correu electronic del teu compte</span>}
           
            </FormGroup>
            

            <FormGroup className='fr'>
                <Label for="preuFinal" className='text-start fw-bold'>Contrassenya</Label>
               
                  <input
                  {...register("contrasenya", {
                    required: true,
                    minLength: 1,
                 
                  })}
                  type="password"
                  />
                  {errors.contrasenya && <span className="text-danger">Indica la teva contrassenya</span>}

               
            </FormGroup>

            <Input className="boto-submit-register mt-5" type="submit" value='Log In'/>
                
          </Form>
          No estas registrat? <Link to="/register">Registret!</Link>
  
        </Col>
        <Col xs="3"/>

      </Row>

  );
}

export default Login;