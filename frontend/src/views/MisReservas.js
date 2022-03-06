import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap
import {Row, Breadcrumb, BreadcrumbItem} from 'reactstrap';

import {Link} from "react-router-dom";

//Css de ViewPropietat
import '../components/PropietatExpand.css';
import axios from 'axios';
class Home extends Component {
  constructor(props) {
    super(props);

      this.state = {
        reserves: [],
        isLoading: false,
        error: null,
      };
  }

  getReservesByUsuari = () => {
    var idClient=localStorage.getItem('idUsuariLogeat');
    var url = "http://127.0.0.1:8000"
    var request = "/misReservas/"+idClient;
    
    axios.get(url + request)
    .then(res => {this.setState({
      reserves: res.data,
          status: true
        });
    })
    //Tractam errors
    .catch(error => this.setState({
      error,
      isLoading: false
    }));
  }

  render() {
   console.log(localStorage.getItem('idUsuariLogeat'));
   console.log(this.state.reserves)

    return (
      
      <Row className="p-4 bg-opacity-50">

        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            Mis Reservas
          </BreadcrumbItem>
        </Breadcrumb>
       
      </Row>  
      
    );
  }
}
 
export default Home;