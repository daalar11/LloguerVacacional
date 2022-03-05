// -- COMPONENTS IMPORTS --
import React, { Component } from 'react';
import Ruter from "./components/Ruter";//Header

// -- CSS IMPORTS --
import './App.css'; // Css de la pagina principal (App.js)

// Context per a l'usuari loggeat
export const UserContext = React.createContext();
UserContext.displayName = 'UsuariLogeat';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      idUsuariLogeat: sessionStorage.getItem("idUsuariLogeat"),
      idioma: 'ca',
      toggleUser: this.toggleUser,
    };

  }

  toggleUser = async (id) => {
    this.setState({
      idUsuariLogeat: id,
    });
  };

  // -- COMENÇA EL METODE RENDER
  render() {

    // -- RETURN DEL METODE RENDER
    return (
      
      <div className="App">
        
          <UserContext.Provider value={this.state}>

            <Ruter />{/* Component principal de l'aplicació */}

          </UserContext.Provider>

      </div>
      
    );//FI DEL RETURN DEL RENDER
  }//FI DEL RENDER
}//FI DEL COMPONENT

export default App;// - Export del component