import React from 'react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import './PropietatExpand.css';

import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

const WEEKDAYS_SHORT = {
  es: ['Do','Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
  ca: ['Dg','Dl', 'Di', 'Dm', 'Dj', 'Dv', 'Ds'],
};
const MONTHS = {
  es: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  ca: [
    'Gener',
    'Febrer',
    'Març',
    'Abril',
    'Maig',
    'Juny',
    'Juliol',
    'Agost',
    'Setembre',
    'Octubre',
    'Novembre',
    'Decembre',
  ],
};

const WEEKDAYS_LONG = {
  es: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ],
  ca: [
    'Diumenge',
    'Dilluns',
    'Dimarts',
    'Dimecres',
    'Dijous',
    'Divendres',
    'Dissabte',
  ],
};

const FIRST_DAY_OF_WEEK = {
  es: 1,
  ca: 1,
};
// Translate aria-labels
const LABELS = {
  es: { nextMonth: 'Mes anterior', previousMonth: 'Proximo mes' },
  ca: { nextMonth: 'Mes anterior', previousMonth: 'Seguent mes' },
};
  

export default class DayPicker extends React.Component {
  constructor(props) {
    super(props);
    this.switchLocale = this.switchLocale.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = {
        disabled: [],
      selectedDay: undefined,
      locale: 'es',
    };
  }

  componentWillReceiveProps(props) {
    this.setState({disabled: props.diesNoDisponibles});
  }

  switchLocale(e) {
    const locale = e.target.value || 'es';
    this.setState({ locale });
  }

  handleDayChange(day) {
    this.setState({ selectedDay: day });
    console.log(day)
  }

  render() {

    function parseDate(str, format, locale) {
        const parsed = dateFnsParse(str, format, new Date(), { locale });
        if (DateUtils.isDate(parsed)) {
          return parsed;
        }
        return undefined;
      }

    function formatDate(date, format, locale) {
        return dateFnsFormat(date, format, { locale });
      }

    const { selectedDay, locale, disabled } = this.state;
    console.log(disabled)
    const FORMAT = 'dd-MM-yyyy';
    return (
      <span>
        {/*<p>
          <select value={locale} onChange={this.switchLocale}>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="ca">Català</option>
          </select>
        </p>*/}
        <DayPickerInput
        onDayChange={this.handleDayChange}
        formatDate={formatDate}
        format={FORMAT}
        placeholder={this.props.placeholder}
        dayPickerProps={{
          /*locale: locale,
          months: MONTHS[locale],
          weekdaysLong: WEEKDAYS_LONG[locale],
          weekdaysShort: WEEKDAYS_SHORT[locale],
          firstDayOfWeek: FIRST_DAY_OF_WEEK[locale],
          labels: LABELS[locale],*/
          showWeekNumbers: true,
          firstDayOfWeek: 1,
          showOutsideDays: true,
          fixedWeeks: true,
          numberOfMonths: 2,
          pagedNavigation: true,
          fixedWeeks: true,
          modifiers: {disabled},
        }}
        />
        {selectedDay && <p>Dia: {selectedDay.toLocaleDateString()}</p>}
      </span>
    );
  }
}