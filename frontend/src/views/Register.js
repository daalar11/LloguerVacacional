import React from "react";
import { useForm } from "react-hook-form";
import {Row, Col, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Register() {

const { t } = useTranslation();

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

        //Si response = 0 vol dir que sha fet el registre amb exit
        if (response.data[0] == 0){

            alert(response.data[1])
            window.location.href = "http://localhost:3000/login";

        } 
        if (response.data[0] == 1) {
            alert(response.data[1]);
        }
        if (response.data[0] == 2) {   
            alert(response.data[1]);
        } 
        
    }).catch(err => console.log(err))

  return (

    <Row className='pt-5'>

        <Col xs="2" />
    
        <Col xs="8">
        
            <h4 className='text-center mt-5'>{t('register.title')}</h4>

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
                        className="border border-dark"
                        id="dni"
                        name="dni"
                        type="text"
                        placeholder="XXXXXXXXA"
                        />  
                        {errors.dni && <span className="text-danger">{t('register.errorDni')}</span>}
                    </FormGroup>

                    <FormGroup className="d-flex flex-column align-items-start fr">
                        <Label className='text-start fw-bold'>{t('register.llinatge1')} <span className="text-danger">*</span></Label>
                        <input
                        {...register("llinatge1", {
                            required: true,
                            minLength: 2,
                            maxLength: 50
                        })}
                        className="border border-dark"
                        id="llinatge1"
                        name="llinatge1"
                        type="text"
                        />
                        {errors.llinatge1 && <span className="text-danger">{t('register.ombligatori')}</span>}
                    </FormGroup>

                    <FormGroup className="d-flex flex-column align-items-start fr">
                        <Label className='text-start fw-bold'>{t('register.pass')} <span className="text-danger">*</span></Label>
                        <input 
                        {...register("contrasenya")}
                        className="border border-dark"
                        id="contrasenya"
                        name="contrasenya"
                        type="password"
                        />
                        {errors.contrasenya && <span className="text-danger">{t('register.ombligatori')}</span>}
                    </FormGroup>
                </Col>
                <Col xs="6">

                    <FormGroup className="d-flex flex-column align-items-start fr">
                        <Label for="preuFinal" className='text-start fw-bold'>{t('register.nom')} <span className="text-danger">*</span></Label>   
                        <input
                        {...register("nom", {
                            required: true,
                            minLength: 3
                        })}
                        className="border border-dark"
                        id="nom"
                        name="nom"
                        type="text"
                        />
                        {errors.nom && <span className="text-danger">{t('register.ombligatori')}</span>}
                    </FormGroup>

                    <FormGroup className="d-flex flex-column align-items-start fr">
                        <Label className='text-start fw-bold'>{t('register.llinatge2')}</Label>
                        <input
                        {...register("llinatge2", {
                            required: true,
                            minLength: 3
                        })}
                        className="border border-dark"
                        id="llinatge2"
                        name="llinatge2"
                        type="text"
                        /> 
                    </FormGroup>

                    <FormGroup className="fr d-flex flex-column align-items-start">
                        <Label className='text-start fw-bold'>{t('register.pass2')} <span className="text-danger">*</span></Label>
                        <input
                        {...register("contrasenya2", {
                            required: true,
                            minLength: 3
                        })}
                        className="border border-dark"
                        id="contrasenya2"
                        name="contrasenya2"
                        type="password"
                        />      
                    </FormGroup>
                
                </Col>

                <FormGroup className="d-flex flex-column align-items-start fr">

                    <Label className='text-start fw-bold'>{t('register.correu')} <span className="text-danger">*</span></Label>
                    <input
                    {...register("correu", {
                        required: true,
                        minLength: 3,
                        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    })}
                    className="border border-dark"
                    id="correu"
                    name="correu"
                    type="email"
                    placeholder="example@gmail.com"
                    />
                    {errors.correu && <span className="text-danger">{t('register.ombligatori')}</span>}
            
                </FormGroup>
                
                <Input className="mt-4 btn btn-outline-dark" type="submit" value={t('register.registrar')}/>
                <p className="mt-4">{t('register.tensUser')} <Link to="/login">{t('register.login')}</Link></p> 

            </Row>

            </Form>
        </Col>
        <Col xs="2"/>
    </Row>
  );
}

export default Register;