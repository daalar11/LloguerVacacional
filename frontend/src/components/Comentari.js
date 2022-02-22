//Importam els components per utilitzar la interficie component
import { Component } from 'react';

//Importar un component de Bootstrap.
import {Card, CardHeader, CardBody, CardFooter, CardText} from 'reactstrap';

import {StarFill, StarHalf, Star } from 'react-bootstrap-icons';

class Mapa extends Component {

  render(){

    return (

        <Card className='mt-4'>

            <CardHeader className='d-flex justify-content-between'>
        
                <span>Aleix Font</span>
                <span>21/02/2022</span>
        
            </CardHeader>
        
            <CardBody>
                        
                <CardText className='text-start'>
                Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto
                de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a
                la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos
                de especimenes.
                </CardText>
                

            </CardBody> 
        
            <CardFooter className='d-flex justify-content-between'>

                <span className='fw-bold'>Valoraració General</span>
                <span>
                    <StarFill />
                    <StarFill />
                    <StarFill />
                    <StarHalf />
                    <Star />
                </span>

            </CardFooter>
        
        </Card>
    
    );
  }
}

export default Mapa;