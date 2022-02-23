import React, { Component } from "react";
import {Col,Row,Input,Label} from 'reactstrap';
import Propietat from "./Propietat";

class Places extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.props.handleChange(event.target.value);
    }


  render() {
    return (
      <div>

          <Row>
          <Label for="places">Nº de places: </Label>
          </Row>
          <Row>
          <Input id="places"
          name="places"
          type="number"
          onInput={this.handleChange}/>
          </Row>
          

      </div>

    );
  }
}
 
export default Places;