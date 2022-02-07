import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap
import MyCard from '../components/MyCard';
import {Container, Row, Col } from 'reactstrap';
 
class Cercarpropietat extends Component {
  render() {
    return (
      
      <div>
        <h2>PAGINA CERCADOR DE PROPIETATS</h2>

        <p>
          CERCADOR AMB FILTRES
        </p>

        <Container>
          <Row>
          <Col>
                    <MyCard title="Titol 1" 
                            subtitle="Subtitol 1" 
                            text="Descripció llarga 1" 
                            photo="https://picsum.photos/200/200?image=10"
                            url="http://www.mylink1.com" />
                  </Col>
                  <Col>
                    <MyCard title="Titol 2" 
                          subtitle="Subtitol 2" 
                          text="Descripció llarga 2" 
                          photo="https://picsum.photos/200/200?image=21"
                          url="http://www.mylink2.com" />
                  </Col>
                  <Col>
                    <MyCard title="Titol 3" 
                          subtitle="Subtitol 3" 
                          text="Descripció llarga 3" 
                          photo="https://picsum.photos/200/200?image=32"
                          url="http://www.mylink3.com" />
                  </Col>
          </Row>
        </Container>
 
        
      </div>
    );
  }
}
 
export default Cercarpropietat;