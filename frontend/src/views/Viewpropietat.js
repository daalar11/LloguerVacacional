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
      propietat: [],
      isLoading: false,
      error: null,
    };
  }

  //Metode amb la peticio axios a n url.
  vistaPropietat = () => {

    //const values = queryString.parse(this.props.location.search);
    //console.log(values);

    var url = "http://127.0.0.1:8000"
    var request = "/all/1";
    //var requestP = "/all/" + values.id;

    axios.get(url + request)
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
  componentDidMount = () => {this.vistaPropietat();
  console.log(this.state.propietat);}

  render() {


    const { propietat, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    
    return (
      
      <div>
        <h2>PAGINA VISTA D'UNA PROPIETAT</h2>

       

                    <Propietat
                            title = {this.state.propietat.nom_propietat}
                            //subtitle = {propietats.localitat.nom_localitat}
                            text={this.state.propietat.normes} 
                            url="http://www.mylink1.com" 
                            caracterisica={this.state.propietat.caracteristica}
                            preu={this.state.propietat.preu_base}
                           />
        
 
      
      </div>
    );
    
    
  }
}
 
export default Viewpropietat;