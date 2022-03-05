import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap
import {Row, Breadcrumb, BreadcrumbItem} from 'reactstrap';

import {Link} from "react-router-dom";
import { Col, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';

class Reservar extends Component {
  constructor(props){
    super(props);
    this.state = {
        propietat :[],
        d_inici:0,
        d_fi:0,
        preu:0,
        today:new Date().toISOString().split("T")[0],
        client:[]
  };

}
  datesByUrl(){
    const queryParams = new URLSearchParams(window.location.search);
    const d_inici = queryParams.get('date1');
    const d_fi = queryParams.get('date2');
    const idPropietat = queryParams.get('id');
    this.setState({d_inici:d_inici});
    this.setState({d_fi:d_fi});
    var url = "http://127.0.0.1:8000"
    console.log(Date.now())
    axios.get(url + "/all/"+idPropietat)
      .then(res => {this.setState({
        propietat: res.data
        
          });
      })
      .catch(error => this.setState({
        error,
        isLoading: false
      }));

      axios.get(url + "/all2/"+idPropietat+"/"+d_inici+"/"+d_fi)
      .then(res => {this.setState({
        preu: res.data
        
          });
      })
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
      axios.get(url + "/client/"+2)
      .then(res => {this.setState({
        client: res.data
        
          });
      })
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }
  
  componentDidMount = () => {
   this.datesByUrl();

  }
  render() {
    console.log(this.state.client);
    
    return (
      
      <Row className='pt-5'>

      <Col xs="3" />
    
      <Col xs="6" className='login rounded mt-5 shadow-lg p-3 mb-5'>
      
        <h4 className='text-center mt-5 mb-3'>Dades de la reserva</h4>
        <Form className='p-4 text-start  d-flex flex-column justify-content-center' method='POST' action="http://localhost:8000/reserva">
        <FormGroup className='fr'>
                <input 
                hidden
                readOnly
                value= {this.state.propietat.idpropietat}
                type="text"
                id = "propietat"
                name='idPropietat'
                />
         
          </FormGroup>
          <FormGroup className='fr'>
                <input 
                hidden
                readOnly
                value= {this.state.client['id']}
                type="text"
                id = "client"
                name='idClient'
                />
         
          </FormGroup>
          <FormGroup className='fr'>
                <input 
                hidden
                readOnly
                value= {this.state.propietat['normes']}
                type="text"
                id = "normes"
                name='normes'
                />
         
          </FormGroup>
          
        <FormGroup className='fr'>
              <Label className='text-start fw-bold'>Nom de la propietat: </Label>
             
                <input 
                 readOnly
                value= {this.state.propietat.nom_propietat}
                type="text"
                
                id = "propietat"
                name='propietat'
               
                />
         
          </FormGroup>

          <FormGroup className='fr'>
              <Label className='text-start fw-bold'>Correu Electronic: </Label>
             
                <input 
                readOnly
                value={this.state.client['correu'] }
                type="email"
                placeholder="example@gmail.com"
               
                />
         
          </FormGroup>

          <FormGroup className='fr'>
              <Label for="preuFinal" className='text-start fw-bold'>Nom i cognoms: </Label>
             {this.state.client['llinatge2']!=undefined &&
             <input
             type="text"
             readOnly
             value={this.state.client['nom'] +" "+this.state.client['llinatge1']+" "+ this.state.client['llinatge2']}
             />
             }
              {this.state.client['llinatge2']===undefined &&
             <input
             type="text"
             readOnly
             value={this.state.client['nom'] +" "+this.state.client['llinatge1']}
             />
             }
              
          </FormGroup>

          <FormGroup className='fr'>
              <Label for="today" className='text-start fw-bold'>Dia de la reserva: </Label>
             
                <input
                type="text"
                readOnly
                value={this.state.today}
                name="today"
                id="today"
                />
          </FormGroup>

          <FormGroup className='fr'>
              <Label for="reserva" className='text-start fw-bold'>Dies de la reserva: </Label>
             
                <input
                type="text"
                readOnly
                value={this.state.d_inici}
                name="dinici"
                id="dinici"
                />

                <input className="mt-2"
                type="text"
                readOnly
                value={this.state.d_fi}
                name="dfi"
                id="dfi"
                />
          </FormGroup>

          <FormGroup className='fr'>
              <Label for="reserva" className='text-start fw-bold'>Preu final: </Label>
             
                <input
                type="text"
                readOnly
                value={this.state.preu['valor']}
                name="preu"
                id="preu"
                />
          </FormGroup>

          <Input className="boto-submit-register mt-5" type="submit" value='Pagament'/>
              
        </Form>

      </Col>
      <Col xs="3"/>

    </Row> 
      
    );
  }
}
 
export default Reservar;