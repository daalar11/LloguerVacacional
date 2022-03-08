import React, { Component } from "react";
import {Col,Row,Input,Label} from 'reactstrap';
import Propietat from "./Propietat";
//Imports Traduccions
import { withTranslation } from 'react-i18next';

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
      <div className='px-4'>

          <Row>
          <Label for="places">{this.props.t('viewpropietat.plases')}</Label>
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
 
export default withTranslation()(Places);