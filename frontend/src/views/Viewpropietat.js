import React, { Component } from "react";
import Propietat from "../components/Propietat";
import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap

import axios from 'axios';

//Importam query string
import queryString from 'query-string';
 
class Viewpropietat extends Component {

  constructor(props) {
    super(props);

    this.state = {
      propietats: [],
      isLoading: false,
      error: null,
    };
  }

  //Metode amb la peticio axios a n url.
  vistaPropietat = () => {

    const values = queryString.parse(this.props.location.search);

    var url = "http://127.0.0.1:8000"
    var request = "/all/1";
    var requestP = "/all/" + values.idPropietat;

    axios.get(url + requestP)
    .then(res => {this.setState({
      propietat: res.data,
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
  componentDidMount = () => {this.carregarPropietats();}

  render() {

    const { propietata, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    
    return (
      
      <div>
        <h2>PAGINA VISTA D'UNA PROPIETAT</h2>

        {propietata.map((propietat, key) => (

                    <Propietat key = {key}
                            title = {propietat.nom_propietat}
                            subtitle = {propietat.localitat.nom_localitat}
                            text={propietat.normes} 
                            url="http://www.mylink1.com" 
                            caracterisica={propietat.caracteristica}
                            preu={propietat.preu_base}
                           />
        
 
                           ))}
      </div>
    );
    
    
  }
}
 
export default Viewpropietat;