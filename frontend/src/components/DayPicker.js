import React from 'react';
import moment from 'moment';
import Helmet from 'react-helmet';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import dateFnsFormat from 'date-fns/format';

import axios from 'axios';

import {Link} from "react-router-dom";
import {Button} from 'reactstrap';

import { withTranslation } from 'react-i18next';


const FORMAT = 'dd-MM-yyyy';

class DayPicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      preu: 0,
      from: null,
      to: null,
      disabledDays: [],
      disabledParsed: [],
      
    };
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

    const arribada = `${dateFnsFormat(new Date(this.state.from), 'yyyy-MM-dd')}`
    const sortida = `${dateFnsFormat(new Date(this.state.to), 'yyyy-MM-dd')}`

    var request = "/all2/" + id + "/" + arribada +"/" +  sortida;

    
    axios.get(url + request)
    .then(res => {this.setState({
        preu: res.data.valor,
            status: true
        });
    })

  }

  handleFromChange(from) {
    this.setState({ from });
  }

  async handleToChange(to) {
    await this.setState({ to }, this.showFromMonth);
    this.calcularPreu();
  }

  render() {

    const { from, to, preu } = this.state;
    const modifiers = { start: from, end: to };
    const fromParseat = `${dateFnsFormat(new Date(from), 'yyyy-MM-dd')}`;
    const toParseat = `${dateFnsFormat(new Date(to), 'yyyy-MM-dd')}`;

    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');

    
    return (
      <div className="InputFromTo m-auto">
        <DayPickerInput
          value={from}
          placeholder={this.props.t('viewpropietat.arribada')}
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
            placeholder={this.props.t('viewpropietat.sortida')}
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
        <p className='text-start fw-bold mt-5'>{this.props.t('viewpropietat.preu')} <span className='ms-2 text-danger' id='preu'>{preu}€</span></p>
        {sessionStorage.getItem("idUsuariLogeat") != null &&
        <Link to={"/reservar?id=" + id + "&date1=" + fromParseat + "&date2=" + toParseat}>
          <Button
          className='mt-4'
          color="dark"
          size="lg"
          >

            {this.props.t('viewpropietat.llogarboto')}
          </Button>
          
          </Link>}
          
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

export default withTranslation()(DayPicker);








