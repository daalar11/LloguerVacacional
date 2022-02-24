import React, { Component } from 'react';
import {Col,Row ,Input, Label,} from 'reactstrap';

class ListCaracateristica extends Component {
    
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
        this.state={
         arrayCar:[]
        };
	}

	async handleChange(event){
        
        await this.setState({arrayCar : ([...this.state.arrayCar,event.target.value])});
		console.log(this.state.arrayCar)
        this.props.handleChange(this.state.arrayCar);
        
	}


	render() {
	    return (
            <div>
                <Row>
                    <Label for="select">Caracteristiques : </Label>
                </Row>
                <Row>
                    {this.props.caracteristica.map((caracteristica,key)=>{
                        
                        return(
                            
                            <Row key={key}>
                                <Col className='col-6'>
                                    <Input type="checkbox" name="select" id={caracteristica.id_caracteristica} value={caracteristica.caracteristica} onInput={this.handleChange}>
                                    
                                    </Input>
                                </Col>
                                <Col className='col-6'>
                                    <Label for={caracteristica.id_caracteristica}> 
                                    {caracteristica.caracteristica}
                                    </Label>
                                </Col>
                                
                            </Row>
                            
                        )
                    })}
	            	
                 </Row>

	    	
            </div>
	    );
	}
}


export default ListCaracateristica;