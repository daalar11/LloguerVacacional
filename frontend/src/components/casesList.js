import { createPath } from "history";
import React, { Component } from "react";
import {Col,Row} from 'reactstrap';
import Propietat from "./Propietat";

class CasesList extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    
    applyFilters(propietat){
           let caracteristiques=[]
           let x=0;
           for (const iterador2 in propietat.caracteristica){
            x++;
            }
            for(let i=0;i<x;i++){
                caracteristiques.push(propietat.caracteristica[i].caracteristica)
            }
            console.log(caracteristiques);
            if(propietat.places &&this.props.places&&propietat.localitat.nom_localitat&&this.props.localitat){
                return parseInt(propietat.places)===parseInt(this.props.places) && propietat.localitat.nom_localitat==this.props.localitat;	
            }else if(propietat.places &&this.props.places){
			    return parseInt(propietat.places)===parseInt(this.props.places);
            }else if(propietat.localitat.nom_localitat&&this.props.localitat){
                console.log(propietat.localitat.nom_localitat==this.props.localitat,"localitat")
                return propietat.localitat.nom_localitat==this.props.localitat;	
            }else if(this.checkCar(propietat)===true){   
                //console.log(caracteristiques,this.props.caracteristica, caracteristiques.includes(this.props.caracteristica[0]));
              //console.log(propietat.caracteristica.includes(this.props.caracteristica))
                console.log(propietat.caracteristica[0].caracteristica)
                console.log( propietat.caracteristica[0].caracteristica==this.props.caracteristica[0])
                return propietat.caracteristica[0].caracteristica==this.props.caracteristica[0]
                return this.checkCar(propietat);
               
            }else{
                return true;
            }
        }
        
        
        checkCar(propietat){
            let y=0;
            let x=0;  
            let z=0;
            for(const iterador in this.props.caracteristica){
                y++;
            }
            for (const iterador2 in propietat.caracteristica){
                x++;
            }
            
            for(let i=0;i<y;i++){    
                for(let j=0;j<x;j++){
                    
                    if(propietat.caracteristica[j].caracteristica==this.props.caracteristica[i]){
                        //console.log("z",z,"prop",this.props.caracteristica[i],"casa",propietat.caracteristica[j].caracteristica);
                        return true;
                    }
                }
            }
              
            if(z == y && z != 0){
              return true;  
            }else{
                return false;
            }  
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
              
              
	            {
	                this.props.propietats
	                .filter( propietat => this.applyFilters(propietat))                   
	                .map(function(propietats,key){
                        return(
                            <>
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
                            <hr></hr>
                            </>
                        )
                      } )
                }
	        	</div>
      </div>

    );
  }
}
 
export default CasesList;