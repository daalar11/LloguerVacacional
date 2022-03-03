import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap
import {Row, Breadcrumb, BreadcrumbItem} from 'reactstrap';

import {Link} from "react-router-dom";

//Css de ViewPropietat
import '../components/PropietatExpand.css';

class Home extends Component {
  

  render() {

   

    return (
      
      <Row className="p-4 bg-opacity-50">

        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            Mis Reservas
          </BreadcrumbItem>
        </Breadcrumb>
       
      </Row>  
      
    );
  }
}
 
export default Home;