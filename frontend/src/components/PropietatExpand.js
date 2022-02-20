//Importam el css
import './PropietatExpand.css';

//Importam els components per utilitzar la interficie component
import { Component } from 'react';

//Importar un component de Bootstrap.
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Row, Col} from 'reactstrap';
import {Link} from "react-router-dom";


class PropietatExpand extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
         
        };
      }

  render(){

    const titol = (this.props);
  
    return (
      
        <Container>
            <Row>
                <Col className='contenidor'>
                
                    <p>{titol.titol}</p>
                
                
                </Col> 
            </Row>
        </Container>

    );
  }
}

export default PropietatExpand;