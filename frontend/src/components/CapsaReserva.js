//Importam els components per utilitzar la interficie component
import { Component } from 'react';
import React from "react";

//Importar un component de Bootstrap.
import {Col, Form} from 'reactstrap';

import DayPicker from "./DayPicker";
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

import axios from 'axios';

class CapsaReserva extends Component {

    constructor(props) {
        super(props);
        this.state = {
          diesNoDisponibles: [],
          arribada: "",
          sortida: "", 
          isLoading: false,
          error: null,
        };

        this.changeArribada=this.changeArribada.bind(this);
        this.changeSortida=this.changeSortida.bind(this);

      }

    changeArribada(dataArribada){
      //const dataParseada = dataArribada.getFullYear() + '-' + dataArribada.getMonth() + 1 +'-'+ dataArribada.getDate();
      this.setState({arribada : dataArribada});
      console.log(this.state.arribada)
    }

    changeSortida(dataSortida){
      //const dataParseada = dataSortida.getFullYear() + '-' + dataSortida.getMonth() + 1 +'-'+ dataSortida.getDate();
      this.setState({sortida : dataSortida});
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

    if (sessionStorage.getItem("idUsuariLogeat")==null){

    return (

        <Col xs="3" className='mt-1'>

            <Form className='mt-5 text-start  d-flex flex-column justify-content-center' action='/login'>

                <span className='fw-bold'>Estableix les dates de la teva estada</span>
                <hr></hr>

                {/* Input data entrada */}
                <DayPicker 
                diesNoDisponibles={diesNoDisponibles}
                handleChangeArribada={this.changeArribada}
                handleChangeSortida={this.changeSortida}
                />                
                
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

              <Form className='mt-5 text-start  d-flex flex-column justify-content-center' action='/login'>

                <span className='fw-bold'>Estableix les dates de la teva estada</span>
                <hr></hr>

                {/* Input data entrada */}
                <DayPicker 
                diesNoDisponibles={diesNoDisponibles}
                />

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