import React, { Component } from "react";
import {Col,Row} from 'reactstrap';
import Propietat from "./Propietat";

class CasesList extends Component {
    constructor(props){
        super(props);
    }
    
    applyFilters(propietat){
            if(propietat.places &&this.props.places&&propietat.localitat.nom_localitat&&this.props.localitat){
                return parseInt(propietat.places)===parseInt(this.props.places) && propietat.localitat.nom_localitat==this.props.localitat;	
            }else if(propietat.places &&this.props.places){
			    return parseInt(propietat.places)===parseInt(this.props.places);
            }else if(propietat.localitat.nom_localitat&&this.props.localitat){
                return propietat.localitat.nom_localitat==this.props.localitat;	
            }else{
                return true;
            }
        }
        filterTwo(propietat){

        }
        
  render() {
    return (
      <div>
          {/*this.props.propietats.map(function(propietats,key){
            return(
                <Propietat key = {key}    
                title = {propietats.nom_propietat}
                subtitle = {propietats.localitat.nom_localitat}
                text={propietats.normes} 
                url="http://www.mylink1.com" 
                caracteristica={propietats.caracteristica}
                preu={propietats.preu_base}
                id={propietats.idpropietat}
                src="http://admin.lloguerdavid.me/Media/1234-media/1234-portada.jpg"
                />
            )
          })*/}
          <div>
              <hr/>
              
	            {
	                this.props.propietats
	                .filter( propietat => this.applyFilters(propietat))
	                .map(function(propietats,key){
                        return(
                            <Propietat key = {key}    
                            title = {propietats.nom_propietat}
                            subtitle = {propietats.localitat.nom_localitat}
                            text={propietats.normes} 
                            places={propietats.places}
                            url="http://www.mylink1.com" 
                            caracteristica={propietats.caracteristica}
                            preu={propietats.preu_base}
                            id={propietats.idpropietat}
                            src="http://admin.lloguerdavid.me/Media/1234-media/1234-portada.jpg"
                            />
                        )
                      } )
                }
	        	</div>
      </div>

    );
  }
}
 
export default CasesList;