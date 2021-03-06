import React, { Component } from "react";

//Imports dels altres components fills
import Carrousel from "../components/Carrousel";
import Mapa from "../components/Mapa";
import DadesPropietat from "../components/DadesPropietat";
import CapsaComentaris from "../components/CapsaComentaris";

import {Row, Col, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import axios from 'axios';
import {Link} from "react-router-dom";

//Imports Traduccions
import { withTranslation } from 'react-i18next';
 
class Viewpropietat extends Component {

  constructor(props) {
    super(props);

      this.state = {
        propietat: [],
        localitat:[],
        habitacions: [],
        caracteristiques: [],
        comentaris: [],
        fotos: [],
        isLoading: false,
        error: null,
      };
  }

  //Metode amb la peticio axios a n url.
  propietatById = () => {

    //Agafam el parametres de la URL d'aquesta forma. (No fa falta instalar cap packet, ve a javascript intern)
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    const url = "http://127.0.0.1:8000"
    //const url = "https://api.lloguerdavid.me"

    var request = "/all/" + id;

    axios.get(url + request)
    .then(res => {this.setState({
      propietat: res.data,
      localitat: res.data.localitat,
      habitacions: res.data.habitacions,
      caracteristiques: res.data.caracteristica,
      comentaris: res.data.comentaris,
      fotos: [],
      status: true
        });
    })
    //Tractam errors
    .catch(error => this.setState({
      error,
      isLoading: false
    }));
  }

  getFotos = () => {

     //Agafam el parametres de la URL d'aquesta forma. (No fa falta instalar cap packet, ve a javascript intern)
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    const url = "http://127.0.0.1:8000"

    var request = "/propietat/" + id + "/fotos/info";
    
    axios.get(url + request)
    .then(res => {this.setState({
      fotos: res.data,
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
    this.propietatById();
    this.getFotos();
  }

  render() {

    const {propietat, localitat, isLoading, error, habitacions, caracteristiques, comentaris, fotos} = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
        
        <Row>
          <Col>

            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/">{this.props.t('breadcrumb.home')}</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to="/cercarpropietat">{this.props.t('breadcrumb.cercar')}</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
              {this.props.t('breadcrumb.vistacasa')} 
              </BreadcrumbItem>
            </Breadcrumb>
            
            {/* Component Carrousel */}
            <Carrousel 
            fotos = {fotos}
            />

            <DadesPropietat 
            title = {propietat.nom_propietat}
            direccio = {propietat.direccio}
            plases = {propietat.places}
            localitat = {localitat.nom_localitat}
            numeroHabitacions = {habitacions.length}
            habitacions = {habitacions}
            banys = {propietat.banys_propietat}
            text = {propietat.normes}
            dsetmana = {propietat.descompte_setmana}
            dmes = {propietat.descompte_mes}
            caracteristiques = {caracteristiques}
            preu = {propietat.preu_base}
            id = {propietat.idpropietat}
            />

            {/* Component Mapa Localitzaci?? propietat*/}
            <Mapa 
            propietat = {propietat}
            />

            {/* Component Capsa de Comentaris */}
            <CapsaComentaris 
            comentaris = {comentaris}
            />

          </Col> 
        </Row>
    

    );
    
    
  }
}
 
export default withTranslation()(Viewpropietat);