//Importam el css (app.css)
import '../App.css';

//Importam els components per utilitzar la interficie component
import { Component } from 'react';

//Importar un component de Bootstrap.
import {Card,Row, CardImg, CardText, CardBody, CardTitle, Button} from 'reactstrap';
import {Link} from "react-router-dom";
//Imports Traduccions
import { withTranslation } from 'react-i18next';


class Propietat extends Component {
  constructor(props){
    super(props);
}
 
  static defaultProps = {
    propeitat: {}
}
  render(){
  
    return (
      
  <Card className='tamanyCard text-start mb-2'>
    <div className='row'>
    <div className='col-xl-5 col-sm-8 col-xs-8'>
    <CardImg
      src={this.props.src}
      height='100%'
      />
    </div>
    <CardBody className='col-xl-7  col-sm-4 d-flex flex-column justify-content-between'
    height='100%'>
      <Row className='d-flex flex-row justify-content-between'>
          <CardTitle xl="4" xs="12"tag="h2" className='mb-3'>
          {this.props.title} - {this.props.subtitle}
          </CardTitle>
      </Row>
      <div className='d-flex justify-content-between flex-row flex-wrap'>
      
        <div>
      
            <h5 className='d-sm-none mb-3 d-md-block'>{this.props.t('cercarcases.caract')} </h5>
            
            <CardText className='d-sm-none d-md-block'>
            {this.props.caracteristica.map(function(caracteristica,key) {
              return(
                <span className='me-2' key= {key}>
                  {caracteristica.caracteristica}
                </span>
              )
            })}
          </CardText>
          <h5>{this.props.t('cercarcases.perupernit')} {this.props.preu}€</h5>
          <h5 xs="12">{this.props.t('cercarcases.plaçes')} {this.props.places}</h5>
          <div xs="12">
          
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
            {this.props.t('cercarcases.boto')}
          </Button></Link>
      </div>
    </CardBody>
    </div>
  </Card>

    );
  }
}

export default withTranslation()(Propietat);