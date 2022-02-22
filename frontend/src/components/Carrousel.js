import React, { Component } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';

//Importar un component de Bootstrap.
import {Row} from 'reactstrap';



const items = [
	  {
	    src: 'https://picsum.photos/800/400?image=550',
	    altText: 'Foto 1',
	    //caption: 'Titol Foto 1'
	  },
	  {
	    src: 'https://picsum.photos/800/400?image=450',
	    altText: 'Foto 2',
	    //caption: 'Titol Foto 2'
	  },
	  {
	    src: 'https://picsum.photos/800/400?image=330',
	    altText: 'Foto 3',
	    //caption: 'Titol Foto 3'
	  }
	];

class MyCarousel extends Component {

  constructor(props) {
      super(props);

      // Estat amb l'índex de la foto activa
      this.state = { activeIndex: 0 };

      // Binding de mètodes del component
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
      this.goToIndex = this.goToIndex.bind(this);
      this.onExiting = this.onExiting.bind(this);
      this.onExited = this.onExited.bind(this);
    }

    onExiting() {
      this.animating = true;
    }

    onExited() {
      this.animating = false;
    }

    next() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({ activeIndex: nextIndex });
    }

    previous() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
      this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
      if (this.animating) return;
      this.setState({ activeIndex: newIndex });
    }


  render() {
  	
      const { activeIndex } = this.state;

      const slides = items.map((item) => {
        return (
          <CarouselItem
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={item.src}
          >
            {/* Etiqueta imatge, podem dir les dimensions */}
            <img src={item.src} alt={item.altText} width='100%' height='450px'/>
            <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
          </CarouselItem>
        );
      });

      return (

        <Row>

          <Carousel
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
          >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
          </Carousel>

        </Row>

      );
    }
}

export default MyCarousel;