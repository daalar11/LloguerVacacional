import React, { Component } from "react";
import {Form, FormGroup, Label, Input,Col,Row} from 'reactstrap';
import './Cercador.css';

class Cercador extends Component {
  render() {
    return (
      
        <div className="fondoCercador">
            <Form>
                <Row>
                    <Col className="col-4">
                        <Row>

                        </Row>
                    </Col>
                    <Col className="col-4">
                        <Row>
                            
                        </Row>
                    </Col>
                    <Col className="col-4">
                        <Row>
                            
                        </Row>
                    </Col>
                </Row>
            </Form>
        </div>
    );
  }
}
 
export default Cercador;