import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom";
import {Row, Col, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function Login() {

  const error = useState(0);

  const { t } = useTranslation();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => axios.post('http://localhost:8000/login', {

    correu: data.correu,
    contrasenya: data.contrasenya,
    
  }).then(function (response){

    //Si les creedencials son correctes i s'inicia sessió
    if (response.data[0] == 0){
    
        sessionStorage.setItem("idUsuariLogeat", response.data[2].id)
        window.location.href = "http://localhost:3000/";
        //window.location.href = "https://www.lloguerdavid.me/";
        
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
      
        <Col xs="6" className='pb-3' >
        
          <h4 className='text-center mt-2 mb-5'>{t('login.title')}</h4>
          <Form className='text-start  d-flex flex-column justify-content-center' action="/" onSubmit={handleSubmit(onSubmit)}>
            <FormGroup className='fr'>
                <Label className='text-start fw-bold'>{t('login.email')}</Label>
               
                  <input
                  {...register("correu", {
                    required: true,
                 
                  })}
                  type="email"
                  className='border border-dark '
                  placeholder="example@gmail.com"
                  id = "correu"
                  name='correu'
                  />
                  {errors.correu && <span className="text-danger">{t('login.errorEmail')}</span>}
           
            </FormGroup>
            

            <FormGroup className='fr'>
                <Label className='text-start fw-bold'>{t('login.pass')}</Label>
               
                  <input
                  {...register("contrasenya", {
                    required: true,
                    minLength: 1,
                 
                  })}
                  className='border border-dark '
                  type="password"
                  />
                  {errors.contrasenya && <span className="text-danger">{t('login.errorPass')}</span>}

               
            </FormGroup>

            <Input className="btn btn-outline-dark mt-3 mb-2" type="submit" value='Log In'/>
                
          </Form>
          {t('login.preguntaRegister')} <Link to="/register">{t('login.register')}</Link>
  
        </Col>
        <Col xs="3"/>

      </Row>

  );
}

export default Login;