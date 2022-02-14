// -- COMPONENTS IMPORTS --
import React, { Component } from 'react';
import Ruter from "./components/Ruter";//Header

// -- CSS IMPORTS --
import './App.css'; // Css de la pagina principal (App.js)

class App extends Component {

  // -- COMENÇA EL METODE RENDER
  render() {

    // -- RETURN DEL METODE RENDER
    return (
      
      <div className="App">
        
        <Ruter />{/* Component principal de l'aplicació */}

      </div>
      
    );//FI DEL RETURN DEL RENDER
  }//FI DEL RENDER
}//FI DEL COMPONENT

export default App;// - Export del component