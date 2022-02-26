import React, { Component } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';

//Importar un component de Bootstrap.
import {Row} from 'reactstrap';

import axios from 'axios';

class MyCarousel extends Component {


  constructor(props) {
      super(props);

      // Estat amb l'índex de la foto activa
      this.state = { 
        idPropietat: this.props.idPropietat,
        activeIndex: 0,
        items: [],
        isLoading: false,
        error: null,
       };

      // Binding de mètodes del component
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
      this.goToIndex = this.goToIndex.bind(this);
      this.onExiting = this.onExiting.bind(this);
      this.onExited = this.onExited.bind(this);
    }

    getFotos = () => {

      var url = "http://127.0.0.1:8000"
      //var request = "/propietat/" + this.state.idPropietat + "/fotos/info";
      var requestp = "/propietat/2/fotos/info";
      
      axios.get(url + requestp)
      .then(res => {this.setState({
        items: res.data,
            status: true
          });
      })
      //Tractam errors
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
    }

    //Metode componentDidMount
    componentDidMount = () => {this.getFotos();}

    onExiting() {
      this.animating = true;
    }

    onExited() {
      this.animating = false;
    }

    next() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({ activeIndex: nextIndex });
    }

    previous() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
      this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
      if (this.animating) return;
      this.setState({ activeIndex: newIndex });
    }

  render() {
  	
      const { activeIndex, items, error, isLoading } = this.state;

      console.log(items);

      const slides = items.map((item) => {
        return (
          <CarouselItem
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={item.src}
          >
            {/* Etiqueta imatge, podem dir les dimensions */}
            <img src={item.src} alt={item.altText} width='100%' height='450px'/>
            {/*<CarouselCaption />  AIXO DONA ERROR */}
          </CarouselItem>
        );
      });

      if (error) {
        return <p>{error.message}</p>;
      }
  
      if (isLoading) {
        return <p>Loading ...</p>;
      }

      return (

        <Row>

          <Carousel
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
          >
            <CarouselIndicators items={this.state.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
          </Carousel>

        </Row>

      );
    }
}

export default MyCarousel;