import { createPath } from "history";
import React, { Component } from "react";
import {Col,Row} from 'reactstrap';
import Propietat from "./Propietat";
//Imports Traduccions
import { withTranslation } from 'react-i18next';

class CasesList extends Component {
     constructor(props){
        super(props);
        this.state = {
            offset: 0,
            todos: [],
            todosPerPage: 5,
            currentPage: 1,
            stateNumbers: []
      };
   
      this.handleClick = this.handleClick.bind(this);
      
    }
  
    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }
    
    applyFilters(propietat){
       
           let caracteristicaPropietat=[];
           let x=0; 
           for(const carac in propietat.caracteristica){
            caracteristicaPropietat.push(propietat.caracteristica[carac].caracteristica);
           }
          
         
            
                const filtres=this.props.caracteristica;
            
            
            if(propietat.places &&this.props.places&&propietat.localitat.nom_localitat&&this.props.localitat&&filtres.length!=0){
              let f=true; 
             
                for(const carac in filtres){
                
                  if(caracteristicaPropietat.indexOf(filtres[carac])==-1){
                  
                    return false;
                  }
                }
              
              return parseInt(propietat.places)===parseInt(this.props.places) && propietat.localitat.nom_localitat==this.props.localitat;
            }else if(propietat.places &&this.props.places&&filtres.length!=0){
              let f=true; 
            
                for(const carac in filtres){
                 
                  if(caracteristicaPropietat.indexOf(filtres[carac])==-1){
                    
                    return false;
                  }
                }
                return parseInt(propietat.places)===parseInt(this.props.places)
            }else if(propietat.localitat.nom_localitat&&this.props.localitat&&filtres.length!=0){
              let f=true; 
            
                for(const carac in filtres){
                 
                  if(caracteristicaPropietat.indexOf(filtres[carac])==-1){
                  
                    return false;
                  }
                }
                return propietat.localitat.nom_localitat==this.props.localitat;	
            } else if(propietat.places &&this.props.places&&propietat.localitat.nom_localitat&&this.props.localitat){
                return parseInt(propietat.places)===parseInt(this.props.places) && propietat.localitat.nom_localitat==this.props.localitat;	
            }else if(propietat.places &&this.props.places){
			    return parseInt(propietat.places)===parseInt(this.props.places);
            }else if(propietat.localitat.nom_localitat&&this.props.localitat){
              
                return propietat.localitat.nom_localitat==this.props.localitat;	
            }else if(filtres.length!=0){ 
              let f=true; 
             
                for(const carac in filtres){
                  
                  if(caracteristicaPropietat.indexOf(filtres[carac])==-1){
                   
                    return false;
                  }
                }
               
                return true;
                
               
            }else{
                return true;
            }
        }
        
     

        
         componentDidMount = () => {
             this.carregarLocalitat();
        } 
        async carregarLocalitat() {
            await this.setState({todos : this.props.propietats});
        }
  render() {
      if(this.state.todos!=this.props.propietats){
          this.carregarLocalitat();
      }
    const { todos, currentPage, todosPerPage,stateNumbers } = this.state;
  
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.filter( propietat => this.applyFilters(propietat)) 
    .slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTodos = currentTodos
    
    .map((todo, index) => {
        return <>
        <Propietat key = {index}    
        title = {todo.nom_propietat}
        subtitle = {todo.localitat.nom_localitat}
        text={todo.normes} 
        places={todo.places}
        url="http://www.mylink1.com" 
        caracteristica={todo.caracteristica}
        preu={todo.preu_base}
        id={todo.idpropietat}
        src={'https://api.lloguerdavid.me/propietat/'+todo.idpropietat+'/fotos/portada'}
        />
        <hr></hr>
        </>;
      });
            // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(todos.filter( propietat => this.applyFilters(propietat)).length / todosPerPage); i++) {
        pageNumbers.push(i);
      }
      
       const renderPageNumbers = pageNumbers
      .map(number => {
        return (
          <li 
            key={number}
            id={number}
            onClick={this.handleClick}
          >
            {number}
          </li>
        );
      });
    return (
            <div>
                <div className="mt-2">
                 
                    {renderTodos}
                </div>
                <Row className="d-flex justify-content-between">
                  <Col xs="8">
                    <ul id="page-numbers">
                        {renderPageNumbers}
                    </ul>
                    </Col>
                    <Col>
                      <span> {this.props.t('cercarcases.paginaactual')} {this.state.currentPage}</span>
                    </Col>

                   
                </Row>

            </div>
            
            
        );

    
  }
}
 
export default withTranslation()(CasesList);