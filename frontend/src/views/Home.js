import React, { Component } from "react";
import Carrousel from "../components/Carrousel";

import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap
import {Container, Row, Col } from 'reactstrap';
import PropietatExpand from "../components/PropietatExpand";

class Home extends Component {

  render() {

    const titol = "Aleix";

    return (
      
      <Container>

        <Row>
          <Col>
            <Carrousel />
          </Col>
        </Row>
        <PropietatExpand prop={titol} />

      </Container>
      
      
    );
  }
}
 
export default Home;