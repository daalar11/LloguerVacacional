import React, { Component } from "react";
import {Form, FormGroup, Label, Input,Col,Row,Button} from 'reactstrap';
import './Cercador.css';

//Importam Axios
import axios from 'axios';
class Filtrador extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          localitats: [],
          isLoading: false,
          error: null,
        };
      }
    carregarLocalitats = () => {
        //var url="api.lloguerdavid.me";
        var url = "http://127.0.0.1:8000";
        var request = "/localitats";

        axios.get(url + request)
        .then(res => {this.setState({
        localitats: res.data,
            status: true
            });
        })
        .catch(error => this.setState({
        error,
        isLoading: false
        }));
       
    }

  componentDidMount = () => {this.carregarLocalitats();
    console.log(this.state.localitats);}  
  render() {
    const { localitats, isLoading, error } = this.state;
    if (error) {
        return <p>{error.message}</p>;
      }
  
      if (isLoading) {
        return <p>Loading ...</p>;
      }
    return (
      
        <div>
            <Label for={this.props.idCar}>{this.props.nomCar}</Label>
            <Input
            type="checkbox"
            id={this.props.idCar}
            value={this.props.idCar}
            >
                {this.props.nomCar}
            </Input>
        </div>
    );
  }
}
 
export default Filtrador;