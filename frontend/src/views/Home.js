import React, { Component } from "react";

import axios from 'axios';

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'react';
 
class Home extends Component {

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
      
      <div>
        <h2>Pagina Principal</h2>

        <p>
          PART 1: CARROUSEL<br/>PART2: Posa una propietat a llogar!<br/>Part3: ...
        </p>

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
    );
  }
}
 
export default Home;