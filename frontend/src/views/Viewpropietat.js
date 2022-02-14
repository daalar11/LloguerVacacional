import React, { Component } from "react";
import Propietat from "../components/Propietat";
 
class viewpropietat extends Component {
  render() {
    return (
      
      <div>
        <h2>PAGINA VISTA D'UNA PROPIETAT</h2>

        <p>
        <Propietat title="Titol 1" 
                            subtitle="Subtitol 1" 
                            text="Descripció llarga 1" 
                            photo="https://picsum.photos/200/200?image=10"
                            url="http://www.mylink1.com" />
        </p>
 
        
      </div>
    );
  }
}
 
export default viewpropietat;