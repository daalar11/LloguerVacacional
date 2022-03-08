import React, { Component } from "react";
import {Container, Row, Col} from 'reactstrap';

import { FaFacebookF, FaInstagram, FaTwitterSquare, FaComments, FaPeopleCarry, FaCopyright, FaPersonBooth } from 'react-icons/fa';

//Import Traduccions
import { withTranslation } from 'react-i18next';

class Footer extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
   
      return (
<div className="container-fluid">
        <Row className="footer d-flex flex-lg-row flex-md-column ps-xs-5 justify-content-around align-items-center text-white mt-4 p-4">

            <Col xs="2" />
            <Col md="12" lg="2" className="d-flex flex-column text-start">

                <span className="fs-5"><FaPersonBooth />   {this.props.t('footer.dev')}</span>
                <hr></hr>

                <ul className="list-unstyled">
                    <li className="mb-2">David Almodovar Arenas</li>
                    <li className="mb-2">Aleix Font Comes</li>
                    <li className="mb-2">Ies Manacor</li>
                </ul>
              
            </Col>
            <Col md="12" lg="2" className="d-flex flex-column text-start">

                <span className="fs-5">{this.props.t('footer.title1')}</span>
                <hr></hr>
                <ul className="list-unstyled">
                    <li className="mb-2"><FaComments /> <a className="text-decoration-none text-white" href="#">{this.props.t('footer.contact')} </a></li>
                    <li className="mb-2"><FaPeopleCarry /> <a className="text-decoration-none text-white" href="#">{this.props.t('footer.politica')}</a></li>
                    <li><FaCopyright /> <a className="text-decoration-none text-white" href="#"> {this.props.t('footer.copyright')} </a></li>
                </ul>   
                
            </Col>
            <Col md="12" lg="2" className="d-flex flex-column text-start">

                <span className="fs-5">{this.props.t('footer.title2')}</span>
                <hr></hr>
                <ul className="list-unstyled">
                    <li className="mb-2"><FaFacebookF /> <a className="text-decoration-none text-white" href="https://www.facebook.com/">Facebook</a></li>
                    <li className="mb-2"><FaInstagram /> <a className="text-decoration-none text-white" href="https://www.instagram.com/">Instagram</a></li>
                    <li><FaTwitterSquare /> <a className="text-decoration-none text-white" href="https://www.twitter.com/">Twitter</a></li>
                </ul>   
                
            </Col>
            <Col xs="2" />

        </Row>
        </div>
      );
  }//Fi render
}
 
export default withTranslation()(Footer);