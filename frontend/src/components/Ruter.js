// -- COMPONENTS IMPORTS --
import React, { Component } from 'react';
import Menu from "./Menu";//Header
import './Propietat.js';

// -- CSS IMPORTS --
import 'bootstrap/dist/css/bootstrap.min.css';//Css de bootstrap

// -- IMPORTS REACT ROUTER DOM
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

import {Container } from 'reactstrap';


// -- VIEWS IMPORTS --
import Home from "../views/Home";
import Cercarpropietat from "../views/Cercarpropietat";
import Viewpropietat from "../views/Viewpropietat";
import Login from "../views/Login";
import Contact from "../views/Contact";
import Register from "../views/Register";
import Reservar from "../views/Reservar";
import MisReservas from "../views/MisReservas";

class Ruter extends Component {

  // -- COMENÇA EL METODE RENDER
  render() {

    // -- RETURN DEL METODE RENDER
    return (
      
      <Router>

        {/* Div principal Applicacio (Div General) */}
        

        {/* Component Menu (HEADER-NAVBAR) */}
        <Menu/>

        {/* Content de la pagina (Contingut del MAIN) */}
        <Container className="content mt-5"> {/*Seccio Content*/}

          {/* Rutes del Navbar */}
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/cercarpropietat" element={<Cercarpropietat />} />
            <Route path="/viewpropietat" element={<Viewpropietat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reservar" element={<Reservar />} />
            <Route path="/misreservas" element={<MisReservas />} />
            
          </Routes>
          
        </Container>{/* Fi div Content */}
     
    </Router>
    );//FI DEL RETURN DEL RENDER
  }//FI DEL RENDER
}//FI DEL COMPONENT

export default Ruter;// - Export del component