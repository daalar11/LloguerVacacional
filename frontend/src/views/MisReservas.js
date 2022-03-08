import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap
import {Row, Breadcrumb, BreadcrumbItem,Col,Table, Button} from 'reactstrap';

import {Link} from "react-router-dom";


import axios from 'axios';
class Home extends Component {
  constructor(props) {
    super(props);

      this.state = {
        reserves: [],
        propietat:[],
        isLoading: false,
        error: null,
      };
  }

  getReservesByUsuari = () => {
    var idClient=sessionStorage.getItem('idUsuariLogeat');
    var url = "http://127.0.0.1:8000"
    // var url = "https://api.lloguerdavid.me";
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
  getPropietat = () => {
    var url = "http://127.0.0.1:8000"
    //var url = "https://api.lloguerdavid.me";
    var request = "/all/"+this.state.reserves.id_propietat;
    
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
    componentDidMount = () => {
      this.getReservesByUsuari();
      this.getPropietat();

  }

  render() {

   const reserves=this.state.reserves.map((reserva,index)=>{
    return(
    
    <tr key={index}>
      <th scope="row">
        {reserva.idreserva}
      </th>
      <td>{reserva.d_arribada}</td>
      <td>{reserva.d_sortida}</td>
      <td>{reserva.preu_final} €</td>
      <td>
        <Link  to={"/viewpropietat?id="+reserva.id_propietat}>
      <Button className="btn btn-dark">
        Anar a casa
        </Button>
        </Link>
        </td>
    </tr>
   )
  });

    return (
      
      <Row className="p-4 bg-opacity-50">
        <Col className="col-12">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              Mis Reservas
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
        <Col className="col-12">
<Table
 hover
 responsive
>
  <thead>
    <tr>
      <th>
        Id reserva
      </th>
      <th>
        Data arribada
      </th>
      <th>
        Data sortida
      </th>
      <th>
        Preu
      </th>
      <th>
        Casa
      </th>
    </tr>
  </thead>
  <tbody>
    
    {reserves}
  </tbody>
</Table>
        </Col>
      </Row>  
      
    );
  }
}
 
export default Home;