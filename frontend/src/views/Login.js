// -- COMPONENTS IMPORTS --
import { Component } from 'react';

//Imports Reactstrap
import {Row, Col, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupText} from 'reactstrap';
import {Link} from "react-router-dom";

//Css de ViewPropietat
import '../components/PropietatExpand.css';

import axios from 'axios';

class Login extends Component {

  constructor(props) {
    super(props);

      this.state = {
        clients: [],
        isLoading: false,
        error: null,
      };
  }

  //Metode amb la peticio axios a n url.
  allClients = () => {

    var url = "http://127.0.0.1:8000"
    var request = "/client";

    axios.get(url + request)
    .then(res => {this.setState({
      clients: res.data,
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
    this.allClients();
  }

  validarUsuari = (e) => {

    let correu = document.querySelector('#correu').value;
    let pass = document.querySelector('#pass').value;

    this.state.clients.map((client) => {

      if (client.correu == correu){

        //Falta bcrypt
        if (client.contrassenya == pass) {

          // + Context AQUI
          return true;

        }

      } else {
        e.preventDefault();
        console.log('ERROR EN EL LOGIN');
      }

    })
  
  }

  // -- COMENÇA EL METODE RENDER
  render() {

    const {clients, isLoading, error} = this.state;

    console.log(clients)
    

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    // -- RETURN DEL METODE RENDER
    return (
      
      <Row className='pt-5'>

        <Col xs="3" />
      
        <Col xs="6" className='login rounded mt-5 shadow-lg p-3 mb-5'>
        
          <h4 className='text-center mt-5 mb-3'>Inicia Sessió</h4>
          <Form className='p-4 text-start  d-flex flex-column justify-content-center' action="/" onSubmit={this.validarUsuari}>
            
            <FormGroup>
                <Label className='text-start fw-bold'>Correu Electronic</Label>
                <InputGroup>
                  <InputGroupText>
                    @
                  </InputGroupText>
                  <Input 
                  type="email"
                  placeholder="example@gmail.com"
                  id = "correu"
                  name='correu'
                  />
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <Label for="preuFinal" className='text-start fw-bold'>Contrassenya</Label>
                <InputGroup>
                  <InputGroupText className='pe-3'>
                    #
                  </InputGroupText>
                  <Input 
                  type="password"
                  id='pass'
                  name='pass'
                  />
                </InputGroup>
            </FormGroup>

            <Button color="outline-dark" className='text-center fw-bold inputDate mt-3 mb-3'>Log In</Button>
                
          </Form>
          No estas registrat? <Link to="/register">Registret!</Link>
  
        </Col>
        <Col xs="3"/>

      </Row>

    );//FI DEL RETURN DEL RENDER
  }//FI DEL RENDER
}//FI DEL COMPONENT

export default Login;// - Export del component