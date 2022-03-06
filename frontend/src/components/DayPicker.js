import React from 'react';
import moment from 'moment';
import Helmet from 'react-helmet';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import dateFnsFormat from 'date-fns/format';

import { formatDate, parseDate } from 'react-day-picker/moment';

import axios from 'axios';

const FORMAT = 'dd-MM-yyyy';

export default class DayPicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      preu: null,
      from: undefined,
      to: undefined,
      disabledDays: [],
      disabledParsed: [],
      
    };
  }

  handleChangeArribada(dataArribada){
    this.props.handleChangeArribada(dataArribada.target.value);
  }

  handleChangeSortida(dataSortida){
    this.props.handleChangeSortida(dataSortida.target.value);
  }

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }

  //Metode que formatea lestructura de dades que arriba de la API i les converteix a una estructura de dates compatible amb el daypicker
  formatearDiesNoDisponibles = () => {

    let diesNoParseats = this.state.disabledDays;
    let diesParseats = [];

    for (var i=0; i<diesNoParseats.length; i++){

      let after = diesNoParseats[i].after;
      let before = diesNoParseats[i].before;

      let afterDay = new Date (after);
      let beforeDay = new Date (before);


      afterDay.setDate(afterDay.getDate() - 1);
      beforeDay.setDate(beforeDay.getDate() + 1);

      diesParseats.push({"after": new Date(afterDay), "before": new Date(beforeDay)})

    }

    diesParseats.push({"before": new Date()})

    return diesParseats;

  }

  componentWillReceiveProps(props) {
    //console.log(this.state.disabledDays)
    this.setState({disabledDays: props.diesNoDisponibles});
    this.setState({disabledParsed: this.formatearDiesNoDisponibles()});
    //console.log(this.state.disabledParsed)
  }

  calcularPreu = () => {
        
    console.log("Calculant preu...")

    //Agafam el parametres de la URL d'aquesta forma. (No fa falta instalar cap packet, ve a javascript intern)
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    const url = "http://127.0.0.1:8000"

    var request = "/all2/" + id + "/" + this.state.from +"/" + this.state.to;
    var requestp = "/all2/" + id + "/" + "2022-03-13" +"/" + "2022-03-18";
    
    axios.get(url + request)
    .then(res => {this.setState({
        preu: res.data.valor,
            status: true
        });
    })
    console.log("El preu es", this.state.preu)
  }

  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    //const dataParseada = from.getFullYear() + '-' + from.getMonth() + 1 +'-'+ from.getDate();
    
    this.setState({ from });
    console.log(this.state.from)
  }

  handleToChange(to) {
    
    //const dataParseada = to.getFullYear() + '-' + to.getMonth() + 1 +'-'+ to.getDate();
    this.setState({ to }, this.showFromMonth);

    //this.calcularPreu();

    console.log("Data sortida es", this.state.to)
  }

  render() {

  
    const { from, to, preu } = this.state;
    const modifiers = { start: from, end: to };
    
    return (
      <div className="InputFromTo m-auto">
        <DayPickerInput
          value={from}
          placeholder="Arribada"
          formatDate={this.formatDate}
          format={FORMAT}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: this.state.disabledParsed,
            toMonth: to,
            modifiers,
            numberOfMonths: 2,
            onDayClick: () => this.to.getInput().focus(),
          }}
          onDayChange={this.handleFromChange}
        />{' '}
        {' '}
        <span className="InputFromTo-to">
          <DayPickerInput
            ref={el => (this.to = el)}
            value={to}
            placeholder="Sortida"
            formatDate={this.formatDate}
            format={FORMAT}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: this.state.disabledParsed,
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 2,
            }}
            onDayChange={this.handleToChange}
          />
        </span>
        <br></br>
        <span className='text-start fw-bold mt-5'>Preu <span className='ms-2 text-danger' id='preu'>{preu}€</span></span>
        <Helmet>
          <style>{`
            .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
              background-color: #f0f8ff !important;
              color: #4a90e2;
            }
            .InputFromTo .DayPicker-Day {
              border-radius: 0 !important;
            }
            .InputFromTo .DayPicker-Day--start {
              border-top-left-radius: 50% !important;
              border-bottom-left-radius: 50% !important;
            }
            .InputFromTo .DayPicker-Day--end {
              border-top-right-radius: 50% !important;
              border-bottom-right-radius: 50% !important;
            }
            .InputFromTo .DayPickerInput-Overlay {
              width: 550px;
            }
            .InputFromTo-to .DayPickerInput-Overlay {
              margin-left: -198px;
            }
          `}
          </style>
        </Helmet>
      </div>
    );
  }
}




