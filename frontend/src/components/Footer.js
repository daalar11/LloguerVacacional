import React, { Component } from "react";
import {Row, Col} from 'reactstrap';

import '../components/PropietatExpand.css';
import { FaFacebookF, FaInstagram, FaTwitterSquare, FaComments, FaPeopleCarry, FaCopyright } from 'react-icons/fa';

//Import Traduccions
import { withTranslation } from 'react-i18next';

class Footer extends Component {

  constructor(props) {
    super(props);

      this.state = {
     
      };
  }
  
  render() {
   
      return (

        <Row className="d-flex justify-content-around align-items-center text-white rowFooter mt-4">

            <Col xs="5" className="d-flex flex-column me-2 ms-2 ">

                <span className="fs-5">{this.props.t('footer.title1')}</span>
                <hr></hr>
                <ul className="list-unstyled">
                    <li className="mb-2"><FaComments /> <a className="text-decoration-none text-white" href="https://www.facebook.com/">{this.props.t('footer.contact')} </a></li>
                    <li className="mb-2"><FaPeopleCarry /> <a className="text-decoration-none text-white" href="https://www.facebook.com/">{this.props.t('footer.politica')}</a></li>
                    <li><FaCopyright /> <a className="text-decoration-none text-white" href="https://www.facebook.com/"> {this.props.t('footer.copyright')} </a></li>
                </ul>   
                
            </Col>
            <Col xs="5" className="d-flex flex-column">

                <span className="fs-5">{this.props.t('footer.title2')}</span>
                <hr></hr>
                <ul className="list-unstyled">
                    <li className="mb-2"><FaFacebookF /> <a className="text-decoration-none text-white" href="https://www.facebook.com/">Facebook</a></li>
                    <li className="mb-2"><FaInstagram /> <a className="text-decoration-none text-white" href="https://www.instagram.com/">Instagram</a></li>
                    <li><FaTwitterSquare /> <a className="text-decoration-none text-white" href="https://www.twitter.com/">Twitter</a></li>
                </ul>   
                
            </Col>


        </Row>


      );
   

  }//Fi render
}
 
export default withTranslation()(Footer);