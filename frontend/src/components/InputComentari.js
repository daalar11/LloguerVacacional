//Css de ViewPropietat
import '../components/PropietatExpand.css';

import React from "react";
import { useForm } from "react-hook-form";

import {Row, Col, Input, Card, CardHeader, CardFooter} from 'reactstrap';

import axios from 'axios';

function InputComentari() {

    //Agafam el parametres de la URL d'aquesta forma. (No fa falta instalar cap packet, ve a javascript intern)
    const queryParams = new URLSearchParams(window.location.search);
    const idPropietat = queryParams.get('id');

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => axios.post('http://localhost:8000/propietat/comentar', 
    {
        idPropietat: idPropietat,
        idClient: sessionStorage.getItem("idUsuariLogeat"),
        comentari: data.comentari,
        notaUbicacio: data.notaUbicacio,
        notaEstada: data.notaEstada,
        notaNeteja: data.notaNeteja
        
        })
    .then(function (response){

        window.location.reload();
        
    }).catch(err => console.log(err))

    if (sessionStorage.getItem("idUsuariLogeat") != null){

        return (

            <Card>

                <CardHeader>
                    <Col xs="12" className='d-flex justify-content-between ms-2 fw-bold'>
                        Has estat a la propietat? Deixa la teva review per tal d'ajudar als futurs inquilins!
                    </Col>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Col xs="12">
                        
                    
                    
                        <div className="form-group mb-2 mt-2 p-2">
                            
                            <textarea
                            {...register("comentari", {
                                required: true,
                                minLength: 1,
                                maxLength: 399,
                            })}
                            type="textarea" name='comentari' className="form-control border border-white" id="comentari" rows="3"/>
                            {errors.comentari && <span className="text-danger">Escriu el teu comentari</span>}
                            
                        </div>
                    
                    <CardFooter>                                  
                        <Row>
                            <Col xs="3" className='text-start fw-bold'>Valora de 1 a 10 la propietat</Col>
                            <Col xs="2">
                                
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text">Ubicació</span>
                                    <input
                                    {...register("notaUbicacio", {
                                        required: true,
                                        min: 0,
                                        max: 10,
                                    })}
                                    type="number"name='notaUbicacio' className="form-control" aria-label="Username" aria-describedby="basic-addon1" />
                                    {errors.notaUbicacio && <span className="text-danger">Nota no valida</span>}
                                </div>
                            </Col>
                            <Col xs="2">
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text">Estada</span>
                                    <input
                                    {...register("notaEstada", {
                                        required: true,
                                        min: 0,
                                        max: 10,
                                    })}
                                    type="number" name='notaEstada' className="form-control" aria-label="Username" aria-describedby="basic-addon1" />
                                    {errors.notaEstada && <span className="text-danger">Nota no valida</span>}
                                </div>
                            </Col>
                            <Col xs="2">
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text" id="basic-addon1">Neteja</span>
                                    <input
                                    {...register("notaNeteja", {
                                        required: true,
                                        min: 0,
                                        max: 10,
                                    })}
                                    type="number" name="notaNeteja" className="form-control" aria-label="Username" aria-describedby="basic-addon1" />
                                    {errors.notaNeteja && <span className="text-danger">Nota no valida</span>}

                                </div>
                            </Col>
                            <Col xs="3" >
                            <Input className="boto-submit-register" type="submit" value='Comentar'/>
                        
                            </Col>
                            
                        </Row>
                    </CardFooter>
                        
                    </Col>
                </form>

            </Card>
        );
    } else {

        return (
            <p className='text-start fw-bold'>Per deixar la teva opinio sobre una propietat es necessari iniciar sessió.</p>
        );
}
}

export default InputComentari;