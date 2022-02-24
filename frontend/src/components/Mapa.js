//Importam els components per utilitzar la interficie component
import { Component } from 'react';

import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

//Importar un component de Bootstrap.
import {Row, Col} from 'reactstrap';

class Mapa extends Component {

  render(){

    if(this.props.propietat.x === undefined){
      return (
        <Row>
        </Row>
      );
    }

    return (

      <Row>

        <Col className='p-3 '>
          <hr></hr>
          <MapContainer className='mapa' zoom={10} center={[this.props.propietat.y, this.props.propietat.x]} scrollWheelZoom={true}>

              <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <CircleMarker
              center={[this.props.propietat.y, this.props.propietat.x]}
              radius={20}
              fillOpacity={0.5}
              stroke={false}
              color={'#80878d'}
              />

          </MapContainer>

        </Col>

      </Row>
    );
  }
}

export default Mapa;