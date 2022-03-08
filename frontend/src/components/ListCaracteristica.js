import React, { Component } from 'react';
import {Col,Row ,Input, Label,} from 'reactstrap';
import './ListCaracteristica.css';
class ListCaracateristica extends Component {
    
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
        this.state={
         arrayCar:[]
        };
	}
    removeItem(arrayCar,value){
        return arrayCar=arrayCar.filter(item=>item!==value);
    }
	async handleChange(event){
        if(event.target.checked){           
                await this.setState({arrayCar : ([...this.state.arrayCar,event.target.value])});
            }else{
                for (var i=0;i<this.state.arrayCar.length;i++){
                    
                    if(this.state.arrayCar[i]==event.target.value){
                        await this.setState({arrayCar: this.removeItem(this.state.arrayCar,this.state.arrayCar[i])});
                    }
                }
        }       
        this.props.handleChange(this.state.arrayCar);
        
	}


	render() {
	    return (
            <div >
                <Row>
                    <Label for="select">Caracteristiques : </Label>
                </Row>
                <Row>
                    {this.props.caracteristica.map((caracteristica,key)=>{
                        
                        return(
                            
                            <Row key={key}>
                                <Col className='col-12 d-flex flex-row'>
                                    <Input type="checkbox" name="select" id={caracteristica.id_caracteristica} value={caracteristica.caracteristica} onInput={this.handleChange}>
                                    
                                    </Input>
                                
                                    <Label className='mx-2' for={caracteristica.id_caracteristica}> 
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