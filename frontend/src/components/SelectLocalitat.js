import React, { Component } from 'react';
import {Col,Row ,Input, Label,} from 'reactstrap';
//Imports Traduccions
import { withTranslation } from 'react-i18next';

class SelectLocalitat extends Component {

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
                    <Label for="select">{this.props.t('viewpropietat.localitat')}</Label>
                </Row>
				<Row>
	    	<Input type="select" name="select" id="select" onChange={this.handleChange}>
	    		<option></option>
                {this.props.localitat.map(function(localitats,key){
                    return(
                         <option  key={key} value={localitats.nom_localitat}>{localitats.nom_localitat} </option>
                    )
                })}

	    	</Input>
			</Row>
            </div>
	    );
	}
}


export default withTranslation()(SelectLocalitat);