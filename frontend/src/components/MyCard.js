//Importam el css (app.css)
import '../App.css';

//Importam els components per utilitzar la interficie component
import react, { Component } from 'react';

//Importar un component de Bootstrap.
import {Alert, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';


class MyCard extends Component {

  render(){
  
    return (
      
  <Card>
    <CardBody>
      <CardTitle tag="h5">
        Card title
      </CardTitle>
      <CardSubtitle className="mb-2 text-muted" tag="h6">
        Card subtitle
      </CardSubtitle>
      <CardText>
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </CardText>
      <Button>
        Button
      </Button>
    </CardBody>
  </Card>

    );
  }
}

export default MyCard;