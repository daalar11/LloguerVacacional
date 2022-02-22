//Importam els components per utilitzar la interficie component
import { Component } from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

//Importar un component de Bootstrap.
import {Row, Col} from 'reactstrap';

class Mapa extends Component {

  render(){

    return (

      <Row>

        <Col className='p-3'>

          <MapContainer className='mapa' center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>

              <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={[51.505, -0.09]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
              </Marker>

          </MapContainer>

        </Col>

      </Row>
    );
  }
}

export default Mapa;