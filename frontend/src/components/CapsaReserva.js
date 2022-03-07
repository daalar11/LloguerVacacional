//Importam els components per utilitzar la interficie component
import { Component } from 'react';
import React from "react";

//Importar un component de Bootstrap.
import {Col} from 'reactstrap';

import DayPicker from "./DayPicker";

import axios from 'axios';

import { withTranslation } from 'react-i18next';

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

    if (sessionStorage.getItem("idUsuariLogeat")==null){

    return (

        <Col xs="3" className='mt-4'>

                <span className='fw-bold'>{this.props.t('viewpropietat.titolDates')}</span>
                <hr></hr>

                {/* Input data entrada */}
                <DayPicker 
                diesNoDisponibles={diesNoDisponibles}
                handleChangeArribada={this.changeArribada}
                handleChangeSortida={this.changeSortida}
                />                

            <p className='text-start text-black-75 mt-4'>
            {this.props.t('viewpropietat.p1')}<br></br><br></br>
            {this.props.t('viewpropietat.p2')} <span className='fw-bold'><a className='text-dark' href='http://localhost:3000/login'>{this.props.t('login.title')}</a></span> {this.props.t('viewpropietat.p3')}
            </p>
        
        </Col>
        
    );
    } else {
        return (
             <Col xs="3" className='mt-1'>

           

                <span className='fw-bold'>{this.props.t('viewpropietat.titolDates')}</span>
                <hr></hr>

                {/* Input data entrada */}
                <DayPicker 
                diesNoDisponibles={diesNoDisponibles}
                />

              

           

            <p className='text-start text-black-75 mt-4'>
            {this.props.t('viewpropietat.selecc')}<br></br><br></br>
            {this.props.t('viewpropietat.clica')}
            </p>
        
        </Col>
        );
    }
  }
}

export default withTranslation()(CapsaReserva);