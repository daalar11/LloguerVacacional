import React, { Component } from "react";
import {Form, FormGroup, Label, Input,Col,Row,Button} from 'reactstrap';
import './Cercador.css';

//Importam Axios
import axios from 'axios';
class Cercador extends Component {

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
      
        <div className="fondoCercador">
            <Form>
                <Row>
                    <Col className="col-4">
                        <Row>
                            <Label
                                for="places"
                            >
                            Nº de places:     
                            </Label>
                        </Row>
                        <Row>    
                            <Input
                                id="places"
                                name="places"
                                placeholder="Nº de places"
                                type="number"
                            />
                        </Row>
                    </Col>
                    <Col className="col-4">
                        <Row>
                            <Label
                                for="localitats"
                            >
                                Localitats:     
                            </Label>    
                            <Input 
                                id="localitats"
                                name="localitats"
                                type="select"
                            >
                             
                                {/*localitats.map(function(localitats,key){
                                    <option key = {key}
                                        value={localitats.idlocalitat}
                                    >
                                        {localitats.nom_localitat}
                                    </option>
                                
                                })*/}
                                 {this.props.localitats.map((localitat,key) => (

                                    <option key={key} value={localitat.idlocalitat}>{localitat.nom_localitat}</option>

                                 ))}

                            </Input>    
                        </Row>
                    </Col>
                    <Col className="col-4">
                        <Row>
                            <Label>
                                Cerca:
                            </Label>
                            <Button className="btn btn-light">
                                Cerca
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </div>
    );
  }
}
 
export default Cercador;