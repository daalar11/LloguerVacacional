import React from "react";
import { useForm } from "react-hook-form";

import {Row, Col, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupText} from 'reactstrap';

import axios from 'axios';

function FormRegister() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => axios.post('http://localhost:8000/register', {

    dni: data.dni,
    nom: data.nom,
    llinatge1: data.llinatge1,
    llinatge2: data.llinatge2,
    contrasenya: data.contrasenya,
    correu: data.correu

  })

  //const onSubmit = data => console.log(data)

 

  return (

    
    <Form  onSubmit={handleSubmit(onSubmit)}>

    <Row id="formulariRegistre">

        <Col xs="6">
            <FormGroup>
                <Label className='text-start fw-bold'>DNI</Label>
                <input
                {...register("dni", {required: true, maxLength: 9})}
                id="dni"
                name="dni"
                type="text"
                placeholder="XXXXXXXXA"
                />   
            </FormGroup>

            <FormGroup>
                <Label className='text-start fw-bold'>Primer Llinatge </Label>
                <input
                {...register("llinatge1", {required: true, maxLength: 50})}
                id="llinatge1"
                name="llinatge1"
                type="text"
                />
            </FormGroup>

            <FormGroup>
                <Label className='text-start fw-bold'>Contrasenya</Label>
                <input 
                {...register("contrasenya")}
                id="contrasenya"
                name="contrasenya"
                type="text"
                />
            </FormGroup>
        </Col>
        <Col xs="6">

            <FormGroup>
                <Label for="preuFinal" className='text-start fw-bold'>Nom</Label>   
                <input
                {...register("nom", {required: true, minLength: 3} )}
                id="nom"
                name="nom"
                type="text"
                />
            </FormGroup>

            <FormGroup>
                <Label className='text-start fw-bold'>Segon Llinatge</Label>
                <input
                {...register("llinatge2", {required: true, minLength: 3})}
                id="llinatge2"
                name="llinatge2"
                type="text"
                />  
            </FormGroup>

            <FormGroup>
                <Label className='text-start fw-bold'>Repeteix la contrassenya</Label>
                <input
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
                <input
                {...register("correu", {required: true, minLength: 3})}
                id="correu"
                name="correu"
                type="email"
                placeholder="example@gmail.com"
                />
            </InputGroup> 
        
        </FormGroup>

        
    </Row>

    <Input type="submit" />

    </Form>


       


  );
}

export default FormRegister;

/*
 <form onSubmit={handleSubmit(onSubmit)}>

        <input {...register("text", {required: true, maxLength: 9})} type="text"></input>
        <input  type="submit"></input>

    </form>
*/