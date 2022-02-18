//Importam el css (app.css)
import '../App.css';
import './Propietat.css';

//Importam els components per utilitzar la interficie component
import react, { Component } from 'react';

//Importar un component de Bootstrap.
import {Alert, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';
import {Link} from "react-router-dom";


class Propietat extends Component {

  pasarIdPropietat(id){
    console.log(id);
   return (<Propietat idPropietat={id} />)  
  }

  render(){
  
    return (
      
  <Card className='tamanyCard mb-2'>
    <div className='row'>
    <div className='col-5'>
    <CardImg
      src={this.props.src}
      height='399'
      />
    </div>
    <CardBody className='col-7 d-flex flex-column justify-content-between'
    height='400px'>
      <div className='d-flex flex-row justify-content-between ms-2 me-3'>
          <CardTitle tag="h2" >
          {this.props.title}
          </CardTitle>
          <CardSubtitle className="mt-2 text-muted" tag="h4">
          Població: {this.props.subtitle}
          </CardSubtitle>
      </div>
      <div className='d-flex justify-content-between flex-row flex-wrap'>
      <CardText className='d-flex justify-content-between'>
            {this.props.text} 
        </CardText>
        <div>
            <h5>Caracteristiques:</h5>
            <CardText>
            {this.props.caracterisica.map(function(caracterisica,key) {
              return(
                <span className='me-2' key= {key}>
                  {caracterisica.caracteristica}
                </span>
              )
            })}
          </CardText>
          <h6>Preu per nit :</h6>
              <CardText>
                {this.props.preu}€
              </CardText>
        </div>   
      </div>
       {/* onClick={()=>{this.pasarIdPropietat(this.props.idPropietat)}} */}
      <div className='d-flex justify-content-center'>
      <Link to={"/viewpropietat?id=" + this.state.idPropietat}>
          <Button 
          color="dark"
          outline
          size="lg"
          >
            Lloga
          </Button></Link>
      </div>
    </CardBody>
    </div>
  </Card>

    );
  }
}

export default Propietat;