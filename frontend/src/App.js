import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Link, Routes} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';//Bootstrap
import Menu from "./components/Menu";//Header

import Home from "./views/Home"; /*Importam el content de les altres vistes */
import Cercarpropietat from "./views/Cercarpropietat";
import Login from "./views/Login";
import Contact from "./views/Contact";
import './App.css'; /* Css */

import './components/MyCard.js';

import axios from 'axios';

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'react';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {

    this.setState({ isLoading: true });

    axios.get(API + DEFAULT_QUERY)
      .then(result => this.setState({
        hits: result.data.hits,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  render() {

    const { hits, isLoading, error } = this.state;

      if (error) {
        return <p>{error.message}</p>;
      }

      if (isLoading) {
        return <p>Loading ...</p>;
      }

    return (
      
      <Router>
      <div className="App">
      <Menu></Menu>
        <nav>
          <ul className="header"> {/*Seccio header*/}
            <li><Link to="/"></Link></li> {/*Exact indica la seccio que es mostra per defecte*/}
            <li><Link to="/cercarpropietat"></Link></li>
            <li><Link to="/login"></Link></li>
            <li><Link to="/contact"></Link></li>
          </ul>
        </nav>
        <div className="content mt-5"> {/*Seccio Content*/}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cercarpropietat" element={<Cercarpropietat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <table  className="table table-striped table-bordered">
                <thead>
                  <tr><th>Hits</th></tr>
                </thead>
                <tbody>{hits.map(function(item, key) {
                       return (
                          <tr key = {key}>
                              <td><a href={item.url}>{item.title}</a></td>
                          </tr>
                        )
                     })}
                </tbody>
           </table>
      </div>
      </Router>
    );
  }
}

export default App;





/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/