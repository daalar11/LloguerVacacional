//Css de ViewPropietat
import '../components/PropietatExpand.css';

import React from "react";
import { useForm } from "react-hook-form";

import {Row, Col, Form, FormGroup, Label, Input} from 'reactstrap';

import axios from 'axios';

import {Link} from "react-router-dom";

function Register() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => axios.post('http://localhost:8000/register', 
  {
        dni: data.dni,
        nom: data.nom,
        llinatge1: data.llinatge1,
        llinatge2: data.llinatge2,
        contrasenya: data.contrasenya,
        correu: data.correu,
        contrasenya2: data.contrasenya2
        
    })
    .then(function (response){

        console.log(response);

        //Si response = 0 vol dir que sha fet el registre amb exit
        if (response.data[0] == 0){

            console.log("Usuari registrat correctament")
            window.location.href = "http://localhost:3000/login";

        } if (response.data[0] == 1) {
            
            //Falta aplicar canvis a la pantalla (ex: lletres varmelles amb missatge)
            console.log("Les contrassenyes no coincideixen.");

        } else {
            console.log("ERROR EN LA RESPOSTA")
        }
        
    }).catch(err => console.log(err))


  return (

    <Row className='pt-5'>

        <Col xs="2" />
    
        <Col xs="8" className='login rounded mt-5 shadow-lg'>
        
            <h4 className='text-center mt-5'>Completa el registre i comença a llogar!</h4>

            <Form onSubmit={handleSubmit(onSubmit)}>

            <Row className="d-flex justify-content-center p-5">

                <Col xs="6">
                    <FormGroup className="d-flex flex-column align-items-start fr">
                        <Label className='text-start fw-bold'>DNI <span className="text-danger">*</span></Label>
                        <input
                        {...register("dni", {
                            required: true,
                            minLength: 9,
                            maxLength: 9,
                            pattern: /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i,
                        })}
                        id="dni"
                        name="dni"
                        type="text"
                        placeholder="XXXXXXXXA"
                        />  
                        {errors.dni && <span className="text-danger">El dni introduit no es valid.</span>}
                    </FormGroup>

                    <FormGroup className="d-flex flex-column align-items-start fr">
                        <Label className='text-start fw-bold'>Primer Llinatge <span className="text-danger">*</span></Label>
                        <input
                        {...register("llinatge1", {
                            required: true,
                            minLength: 2,
                            maxLength: 50
                        })}
                        id="llinatge1"
                        name="llinatge1"
                        type="text"
                        />
                        {errors.llinatge1 && <span className="text-danger">Camp obligatori</span>}
                    </FormGroup>

                    <FormGroup className="d-flex flex-column align-items-start fr">
                        <Label className='text-start fw-bold'>Contrasenya <span className="text-danger">*</span></Label>
                        <input 
                        {...register("contrasenya")}
                        id="contrasenya"
                        name="contrasenya"
                        type="password"
                        />
                        {errors.contrasenya && <span className="text-danger">Camp obligatori</span>}
                    </FormGroup>
                </Col>
                <Col xs="6">

                    <FormGroup className="d-flex flex-column align-items-start fr">
                        <Label for="preuFinal" className='text-start fw-bold'>Nom <span className="text-danger">*</span></Label>   
                        <input
                        {...register("nom", {
                            required: true,
                            minLength: 3
                        })}
                        id="nom"
                        name="nom"
                        type="text"
                        />
                        {errors.nom && <span className="text-danger">Camp obligatori</span>}
                    </FormGroup>

                    <FormGroup className="d-flex flex-column align-items-start fr">
                        <Label className='text-start fw-bold'>Segon Llinatge</Label>
                        <input
                        {...register("llinatge2", {
                            required: true,
                            minLength: 3
                        })}
                        id="llinatge2"
                        name="llinatge2"
                        type="text"
                        /> 
                    </FormGroup>

                    <FormGroup className="fr d-flex flex-column align-items-start">
                        <Label className='text-start fw-bold'>Repeteix la contrassenya <span className="text-danger">*</span></Label>
                        <input
                        {...register("contrasenya2", {
                            required: true,
                            minLength: 3
                        })}
                        id="contrasenya2"
                        name="contrasenya2"
                        type="password"
                        />      
                    </FormGroup>
                
                </Col>

                <FormGroup className="d-flex flex-column align-items-start fr">

                    <Label className='text-start fw-bold'>Correu electrònic <span className="text-danger">*</span></Label>
                    <input
                    {...register("correu", {
                        required: true,
                        minLength: 3,
                        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    })}
                    id="correu"
                    name="correu"
                    type="email"
                    placeholder="example@gmail.com"
                    />
                    {errors.correu && <span className="text-danger">Camp obligatori</span>}
            
                </FormGroup>
                
                <Input className="boto-submit-register mt-5" type="submit" value='Registrar'/>
                <p className="mt-4">Ja tens un compte? <Link to="/login">Inicia Sessió!</Link></p> 

            </Row>

            </Form>
        </Col>
        <Col xs="2"/>

    </Row>

  );
}

export default Register;