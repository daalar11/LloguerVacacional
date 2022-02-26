import React from 'react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import './PropietatExpand.css';

import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

const WEEKDAYS_SHORT = {
  ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  it: ['Do', 'Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa'],
  es: ['Do','Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
  ca: ['Dg','Dl', 'Di', 'Dm', 'Dj', 'Dv', 'Ds'],
};
const MONTHS = {
  ru: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  it: [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
  ],
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
  ru: [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ],
  it: [
    'Domenica',
    'Lunedì',
    'Martedì',
    'Mercoledì',
    'Giovedì',
    'Venerdì',
    'Sabato',
  ],
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
  ru: 1,
  it: 1,
  es: 1,
  ca: 1,
};
// Translate aria-labels
const LABELS = {
  ru: { nextMonth: 'следующий месяц', previousMonth: 'предыдущий месяц' },
  it: { nextMonth: 'Prossimo mese', previousMonth: 'Mese precedente' },
  es: { nextMonth: 'Mes anterior', previousMonth: 'Proximo mes' },
  ca: { nextMonth: 'Mes anterior', previousMonth: 'Seguent mes' },
};
  

export default class DayPicker extends React.Component {
  constructor(props) {
    super(props);
    this.switchLocale = this.switchLocale.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = {
      selectedDay: undefined,
      locale: 'en',
    };
  }

  switchLocale(e) {
    const locale = e.target.value || 'en';
    this.setState({ locale });
  }

  handleDayChange(day) {
    this.setState({ selectedDay: day });
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

    const { selectedDay, locale } = this.state;
    const FORMAT = 'dd-MM-yyyy';
    return (
      <div>
        <p>
          <select value={locale} onChange={this.switchLocale}>
            <option value="en">English</option>
            <option value="ru">Русский (Russian)</option>
            <option value="it">Italian</option>
            <option value="es">Español</option>
            <option value="ca">Català</option>
          </select>
        </p>
        <DayPickerInput
        className="inputDate text-center"
        onDayChange={this.handleDayChange}
        formatDate={formatDate}
        format={FORMAT}
        placeholder={this.props.placeholder}
        dayPickerProps={{
          locale: locale,
          months: MONTHS[locale],
          weekdaysLong: WEEKDAYS_LONG[locale],
          weekdaysShort: WEEKDAYS_SHORT[locale],
          firstDayOfWeek: FIRST_DAY_OF_WEEK[locale],
          labels: LABELS[locale],
          showWeekNumbers: true,
          firstDayOfWeek: 1,
          showOutsideDays: true,
          fixedWeeks: true,
          numberOfMonths: 2,
          pagedNavigation: true,
          fixedWeeks: true,
          modifiers: {
            disabled: [
              {
                before: new Date()
              },
              {
                after: new Date(2022, 2, 5),
                before: new Date(2022, 2, 15)
              },
              new Date(2022, 1, 28),
              
            ]
          }
          
        }}
        />
        {selectedDay && <p>Day: {selectedDay.toLocaleDateString()}</p>}
      </div>
    );
  }
}