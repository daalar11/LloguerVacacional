//Importam els components per utilitzar la interficie component
import { Component } from 'react';
import React from "react";

//Importar un component de Bootstrap.
import {Col, Label, Form} from 'reactstrap';

import DayPicker from "./DayPicker";
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

import axios from 'axios';

class CapsaReserva extends Component {

    constructor(props) {
        super(props);
        this.state = {
          diesNoDisponibles: [],
          isLoading: false,
          error: null,
        };
      }

    getDiesNoDisponibles = () => {

    //Agafam el parametres de la URL d'aquesta forma. (No fa falta instalar cap packet, ve a javascript intern)
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    const url = "http://127.0.0.1:8000"

    var request = "/propietat/" + id + "/nodisponible/info";
    
    axios.get(url + request)
    .then(res => {this.setState({
        diesNoDisponibles: res.data,
            status: true
        });
    })
    //Tractam errors
    .catch(error => this.setState({
        error,
        isLoading: false
    }));
    }

    //Metode componentDidMount
  componentDidMount = () => {
    this.getDiesNoDisponibles();
  }
  
  render(){

    const {isLoading, error, diesNoDisponibles} = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    const FORMAT = 'dd-MM-yyyy';

    if (sessionStorage.getItem("idUsuariLogeat")==null){

    return (

        <Col xs="3" className='mt-1'>

            <Form className='mt-5 text-start  d-flex flex-column justify-content-center' action='#'>

                <span className='fw-bold'>Estableix les dates de la teva estada</span>
                <hr></hr>

                {/* Input data entrada */}
                <DayPicker 
                placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                diesNoDisponibles={diesNoDisponibles}
                />
            
                <span className='text-start fw-bold mt-4'><input type='submit'  className='p-2 bg-light' value="Calcular Preu" /> - Preu <span className='ms-2 text-danger' id='preu'>714€</span></span>
                
                
            </Form>

            <Form className='mt-5 text-start  d-flex flex-column justify-content-center' action='/login'>

                <input type="hidden" name='data-entrada' />
                <input type="hidden" name="data-sortida" />

                <input type='submit' color="dark" className='mt-4 fw-bold bg-dark text-white rounded' value="Llogar" />
                
            </Form>

            <p className='text-start text-black-75 mt-4'>
                Selecciona els dies que desitjaries llogar la propietat per coneixer el preu de l'estada.<br></br><br></br>
                Recorda que has de <span className='fw-bold'><a className='text-dark' href='http://localhost:3000/login'>iniciar sessió</a></span> amb el teu compte per poder reservar una propietat!
            </p>
        
        </Col>
        
             
    

    );
    } else {
        return (
             <Col xs="3" className='mt-1'>

            <Form className='mt-5 text-start  d-flex flex-column justify-content-center' action='/reservar'>

                <span className='fw-bold'>Estableix les dates de la teva estada</span>
                <hr></hr>
                <Label className='text-start fw-bold'>Data Entrada</Label>

                {/* Input data entrada */}
                <DayPicker 
                placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                diesNoDisponibles={diesNoDisponibles}
                />
                
                <Label className='text-start fw-bold mt-4'>Data Sortida</Label>

                {/* Input data sortida */}
                <DayPicker 
                placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                diesNoDisponibles={diesNoDisponibles}
                />
            
            
                <span className='text-start fw-bold mt-4'>Preu: <span className='ms-2 text-danger' id='preu'>714€</span></span>
                <input type='submit' color="dark" className='mt-4 fw-bold bg-dark text-white rounded' value="Llogar" />
                
            </Form>

            <p className='text-start text-black-75 mt-4'>
                Selecciona els dies que desitjaries llogar la propietat per coneixer el preu de l'estada.<br></br><br></br>
                Clica llogar per anar a la pantalla de la teva reserva
            </p>
        
        </Col>
        );
    }
  }
}

export default CapsaReserva;