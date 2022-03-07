//Importam el css (app.css)
import '../App.css';
import './Propietat.css';

//Importam els components per utilitzar la interficie component
import { Component } from 'react';

//Importar un component de Bootstrap.
import {Card,Row, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';
import {Link} from "react-router-dom";


class Propietat extends Component {
  constructor(props){
    super(props);
}
 
  static defaultProps = {
    propeitat: {}
}
  render(){
  
    return (
      
  <Card className='tamanyCard mb-2'>
    <div className='row'>
    <div className='col-xl-5 col-sm-8 col-xs-8'>
    <CardImg
      src={this.props.src}
      height='100%'
      />
    </div>
    <CardBody className='col-xl-7  col-sm-4 d-flex flex-column justify-content-between'
    height='100%'>
      <Row className='d-flex flex-row justify-content-between ms-2 me-3'>
          <CardTitle xs="12"tag="h2">
          {this.props.title}
          </CardTitle>
          <CardSubtitle xs="12" className="mt-2 text-muted" tag="h4">
          Població: {this.props.subtitle}
          </CardSubtitle>
      </Row>
      <div className='d-flex justify-content-between flex-row flex-wrap'>
      <CardText className='d-flex justify-content-between d-sm-none d-md-block' >
            {this.props.text} 
        </CardText>
        <div>
            <h5 className='d-sm-none d-md-block'>Caracteristiques:</h5>
            <CardText className='d-sm-none d-md-block'>
            {this.props.caracteristica.map(function(caracteristica,key) {
              return(
                <span className='me-2' key= {key}>
                  {caracteristica.caracteristica}
                </span>
              )
            })}
          </CardText>
          <h6>Preu per nit :</h6>
              <CardText>
                {this.props.preu}€
              </CardText>
              <h6  xs="12">Places:</h6>
              <div xs="12">
              {this.props.places}
              </div>
        </div>   
      </div>
      <div className='d-flex justify-content-center'>
      <Link to={"/viewpropietat?id=" + this.props.id}>
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