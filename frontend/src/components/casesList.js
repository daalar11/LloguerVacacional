import { createPath } from "history";
import React, { Component } from "react";
import {Col,Row} from 'reactstrap';
import Propietat from "./Propietat";
import ReactPaginate from 'react-paginate';
import './cssPaginacio.css'; 
import axios from 'axios';
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
           let caracteristiques=[]
           let caracteristicaPropietat=[];
           let x=0; 
           for(const carac in propietat.caracteristica){
            caracteristicaPropietat.push(propietat.caracteristica[carac].caracteristica);
           }
            //console.log(caracteristicaPropietat,"carac");
         
            
                const filtres=this.props.caracteristica;
            
            //console.log(filtres);
            if(propietat.places &&this.props.places&&propietat.localitat.nom_localitat&&this.props.localitat&&filtres.length!=0){
              let f=true; 
              //console.log(caracteristiques) 
                for(const carac in filtres){
                  //console.log(filtres[carac]);
                  if(caracteristicaPropietat.indexOf(filtres[carac])==-1){
                    //console.log(caracteristiques[carac])
                    return false;
                  }
                }
               // console.log(propietat.caracteristica,"console og");
              return parseInt(propietat.places)===parseInt(this.props.places) && propietat.localitat.nom_localitat==this.props.localitat;
            }else if(propietat.places &&this.props.places&&filtres.length!=0){
              let f=true; 
              //console.log(caracteristiques) 
                for(const carac in filtres){
                  //console.log(filtres[carac]);
                  if(caracteristicaPropietat.indexOf(filtres[carac])==-1){
                    //console.log(caracteristiques[carac])
                    return false;
                  }
                }
                return parseInt(propietat.places)===parseInt(this.props.places)
            }else if(propietat.localitat.nom_localitat&&this.props.localitat&&filtres.length!=0){
              let f=true; 
              //console.log(caracteristiques) 
                for(const carac in filtres){
                  //console.log(filtres[carac]);
                  if(caracteristicaPropietat.indexOf(filtres[carac])==-1){
                    //console.log(caracteristiques[carac])
                    return false;
                  }
                }
                return propietat.localitat.nom_localitat==this.props.localitat;	
            } else if(propietat.places &&this.props.places&&propietat.localitat.nom_localitat&&this.props.localitat){
                return parseInt(propietat.places)===parseInt(this.props.places) && propietat.localitat.nom_localitat==this.props.localitat;	
            }else if(propietat.places &&this.props.places){
			    return parseInt(propietat.places)===parseInt(this.props.places);
            }else if(propietat.localitat.nom_localitat&&this.props.localitat){
                //console.log(propietat.localitat.nom_localitat==this.props.localitat,"localitat")
                return propietat.localitat.nom_localitat==this.props.localitat;	
            }else if(filtres.length!=0){ 
              let f=true; 
              //console.log(caracteristiques) 
                for(const carac in filtres){
                  //console.log(filtres[carac]);
                  if(caracteristicaPropietat.indexOf(filtres[carac])==-1){
                    //console.log(caracteristiques[carac])
                    return false;
                  }
                }
               // console.log(propietat.caracteristica,"console og");
                return true;
                
               
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
        return <Propietat key = {index}    
        title = {todo.nom_propietat}
        subtitle = {todo.localitat.nom_localitat}
        text={todo.normes} 
        places={todo.places}
        url="http://www.mylink1.com" 
        caracteristica={todo.caracteristica}
        preu={todo.preu_base}
        id={todo.idpropietat}
        src="http://admin.lloguerdavid.me/Media/1234-media/1234-portada.jpg"
        />;
      });
            // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(todos.filter( propietat => this.applyFilters(propietat)).length / todosPerPage); i++) {
        pageNumbers.push(i);
      }
      
       const renderPageNumbers = pageNumbers
      .map(number => {
        return (
          <li className="col-1"
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
                <div>
                    Pagina actual: {this.state.currentPage}
                    {renderTodos}
                </div>
                <Row>
                    <ul id="page-numbers">
                        {renderPageNumbers}
                    </ul>
                </Row>

            </div>
            
            
        );

    
  }
}
 
export default CasesList;