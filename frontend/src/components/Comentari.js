//Importam els components per utilitzar la interficie component
import { Component } from 'react';

//Importar un component de Bootstrap.
import {Card, CardHeader, CardBody, CardFooter, CardText} from 'reactstrap';

import {StarFill, StarHalf, Star } from 'react-bootstrap-icons';

import axios from 'axios';

class Mapa extends Component {

    constructor(props) {
        super(props)
        this.state = {
            client: [],
          };
      }

    //Metode amb la peticio axios a n url.
    clientById = () => {

    var url = "http://127.0.0.1:8000"
    var request = "/client/" + this.props.client;

    axios.get(url + request)
        .then(res => {this.setState({
            client: res.data,
            });
        })
        //Tractam errors
        .catch(error => this.setState({
            error,
            isLoading: false
        }));
    }

    //Metode componentDidMount
    componentDidMount = () => {this.clientById();} 

    //Metode que retorna la mitjana de 3 notes sobre 5
    calcularMitjana(neteja, ubicacio, estada){
        return Math.round((((neteja + ubicacio + estada) / 3)/2) * 100) / 100;
    }

    //Metodes printear estrelles segons valoracions del comentari
    crearEstrellesPlenes(n){
        var elements = [];
        for(let i =0; i < n; i++){
            elements.push(<StarFill />);
        }
        return elements;
    }

    crearEstrellesBuides(n){
        var elements = [];
        for(let i =0; i < 5-n; i++){
            elements.push(<Star />);
        }
        return elements;
    }
      
    render(){

    const {client} = this.state;

    let mitjana = this.calcularMitjana(this.props.ubicacio, this.props.neteja, this.props.estada);

    return (

        <Card className='mt-4'>

            <CardHeader className='d-flex justify-content-between'>
        
                <span>{client.nom} {client.llinatge1}</span>
                <span>{this.props.data}</span>
        
            </CardHeader>
        
            <CardBody>
                        
                <CardText className='text-start'>
                {this.props.text}
                </CardText>
                

            </CardBody> 
        
            <CardFooter className='d-flex justify-content-between'>

                <span className='fw-bold'>Valoraració General</span>
                
                <span>

                    {/* Segons la nota mitjana crea estrelles plenes i la resta buides */}
                    {this.crearEstrellesPlenes(mitjana)}
                    {this.crearEstrellesBuides(mitjana)}

                </span>
                

            </CardFooter>
        
        </Card>
    
    );
  }
}

export default Mapa;