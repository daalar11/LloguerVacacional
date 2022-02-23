import React, { Component } from 'react';
import {Col,Row ,Input, Label,} from 'reactstrap';

class SelectLocalitat extends Component {

	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
        console.log(this.props.localitat)
	}

	handleChange(event){
		this.props.handleChange(event.target.value);
        
	}


	render() {
	    return (
            <div>
                <Row>
                    <Label for="select">Localitat: </Label>
                </Row>
	    	<Input type="select" name="select" id="select" onChange={this.handleChange}>
	    		<option></option>
                {this.props.localitat.map(function(localitats,key){
                    return(
                         <option  key={key} value={localitats.nom_localitat}>{localitats.nom_localitat} </option>
                    )
                })}

	    	</Input>
            </div>
	    );
	}
}


export default SelectLocalitat;