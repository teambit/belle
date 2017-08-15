import React, { Component, PropTypes } from 'react';
import { injectStyles, removeAllStyles } from '../utils/inject-style';
import unionClassNames from '../utils/union-class-names';
import omit from '../utils/helpers/omit';
import has from '../utils/helpers/has';
import map from '../utils/helpers/map';
import shift from '../utils/helpers/shift';
import reverse from '../utils/helpers/reverse';
import uniqueId from '../utils/helpers/uniqueId';
import convertDateToDateKey from '../utils/date-helpers/convertDateToDateKey';
import getDateKey from '../utils/date-helpers/getDateKey';
import getDateForDateKey from '../utils/date-helpers/getDateForDateKey';
import getWeekArrayForMonth from '../utils/date-helpers/getWeekArrayForMonth';
import getLastDayForMonth from '../utils/date-helpers/getLastDaysForMonth';
import getLocaleData from '../utils/date-helpers/getLocaleData';
import today from '../utils/date-helpers/today';
import defaultStyle from '../style/date-picker';
import config from '../config/datePicker';
import ActionArea from './ActionArea';
import DisabledDay from './DisabledDay';
import Day from './Day';

/**
 * ## Belle's date picker component
 * This implementation follows the recommendations proposed [here](http://www.w3.org/TR/wai-aria-practices/#datepicker)
 * 
 * In addition to the props listed below, you can also use:
 * * Properties for handling various events(focus, mouse events, touch events, change in selectedDate, month or year):tabIndex, onFocus, onBlur, onKeyDown, onMouseDown, onMouseUp, onTouchStart, onTouchEnd, onTouchCancel, onUpdate, onMonthUpdate.
 * * ... for adding attributes to specific coponents inside date picker:dayProps, navBarProps, prevMonthNavProps, prevMonthNavIconProps, nextMonthNavProps, nextMonthNavIconProps, monthLabelProps, dayLabelProps, weekHeaderProps, weekGridProps.
 * * ... for adding class to date picker wrapper:className.
 * * ... for adding styling to various parts of html structure of date picker: style, disabledStyle, readOnlyStyle, hoverStyle, activeStyle, focusStyle, disabledHoverStyle, navBarStyle, prevMonthNavStyle, prevMonthNavIconStyle, hoverPrevMonthNavStyle, activePrevMonthNavStyle, nextMonthNavStyle, nextMonthNavIconStyle, hoverNextMonthNavStyle, activeNextMonthNavStyle, weekHeaderStyle, monthLabelStyle, dayLabelStyle, disabledDayLabelStyle, weekendLabelStyle, dayStyle, disabledDayStyle, readOnlyDayStyle, activeDayStyle, focusDayStyle, disabledFocusDayStyle, todayStyle, selectedDayStyle, otherMonthDayStyle, weekendStyle.
 * 
 * &nbsp;
 * ## More info
 * See live [examples](https://gideonshils.github.io/Belle-With-Bit/).
 * 
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/date-picker?_k=6uouuh) documentation.
 * 
 * &nbsp;
 * ## Standard example
 * ```js
 * <DatePicker defaultValue={new Date(${TODAY.getFullYear()},  ${TODAY.getMonth()}, 15)} />
 * ```
 * 
 * &nbsp;
 * ## Internal HTML Structure
 * This should help developer to understand how the DatePicker is structured in order to use the API
 * ```js
 * <div style={ style }>
 * <div>
 *   <!-- this is navigation bar at the top -->
 *   <div style={ navBarStyle }>
 *     <span style={ prevMonthStyle }></span>
 *     <span style={ monthLabelStyle }></span>
 *     <span style={ nextMonthStyle }></span>
 *   </div>
 *   <!-- this is week header -->
 *   <div style={ weekHeaderStyle }>
 *     <span style={ dayLabelStyle }></span>
 *     <span style={ dayLabelStyle }></span>
 *     <span style={ dayLabelStyle }></span>
 *     <span style={ dayLabelStyle }></span>
 *     <span style={ dayLabelStyle }></span>
 *     <span style={ dayLabelStyle }></span>
 *     <span style={ dayLabelStyle }></span>
 *   </div>
 *   <!-- following is repeated for each week -->
 *   <div style={ dayStyle }></div>
 *   <div style={ dayStyle }></div>
 *   <div style={ dayStyle }></div>
 *   <div style={ dayStyle }></div>
 *   <div style={ dayStyle }></div>
 *   <div style={ dayStyle }></div>
 *   <div style={ dayStyle }></div>
 * </div>
 * </div>
 * ```
 * 
 * &nbsp;
 * ## DatePicker with other month days hidden but weekends styled differently
 * ```js
 * <DatePicker defaultValue={new Date(${TODAY.getFullYear()},  ${TODAY.getMonth()}, 15)}
 *             showOtherMonthDate={ false } />
 * ```
 * 
 * &nbsp;
 * ## DatePicker highlighting special day
 * ```js
 * <DatePicker readOnly
 *           renderDay={ this.renderDay }
 *           defaultMonth={ 12 } />
 *
 * renderDay(day) {
 * if (day.getDate() === 25 && day.getMonth() === 11) {
 *   return (
 *     <div>
 *       <span style={{color: '#FFDA46'}}>✵</span>
 *       <span style={{color: 'red'}}>
 *         { day.getDate() }
 *       </span>
 *     </div>
 *   );
 * }
 * return (
 *   day.getDate()
 * );
 * }
 * ```
 * 
 * &nbsp;
 * ## Localization support in DatePicker
 * Belle has inbuilt support for following locales: Arabic, French, Hebrew, Dutch, Chinese. Adding support for a new locale is very easy, check [Configuration](http://nikgraf.github.io/belle/#/configuration?_k=gfx4lz).
 * ```js
 * <DatePicker defaultValue={new Date(${TODAY.getFullYear()},  ${TODAY.getMonth()}, 15)}
 *             locale={ this.state.selectedLocale } />
 * ```
 * 
 * &nbsp;
 * ## Controlled DatePicker component with onMonthUpdate callBack and reset option implemented
 * ```js
 * <DatePicker onMonthUpdate={ this.onMonthUpdate }
 *           defaultMonth={ this.state.selectedMonth }
 *           defaultYear={ this.state.selectedYear }
 *           valueLink={ this.linkState('selectedDate') } />
 *
 * <div>
 * <div>Date: { this.state.selectedDate ?
 *              this.state.selectedDate.getMonth() + '/' +
 *              this.state.selectedDate.getDate() + '/' +
 *              this.state.selectedDate.getFullYear() : '-'}
 * </div>
 * <div>Month: {this.state.selectedMonth}</div>
 * <div>Year: {this.state.selectedYear}</div>
 * <div><a onClick={ this.resetDate }>Reset Date</a></div>
 * </div>
 *
 * onMonthUpdate(month, year) {
 * this.setState({
 *   selectedMonth: month,
 *   selectedYear: year
 * });
 * }
 *
 * resetDate() {
 * this.setState({
 *   selectedDate: undefined
 * });
 * }
 * ```
 * 
 * &nbsp;
 * ## Read only DatePicker
 * ```js
 * <DatePicker defaultValue={new Date(${TODAY.getFullYear()},  ${TODAY.getMonth()}, 15)}
 *             readOnly/>
 * ```
 * 
 * ## Disabled DatePicker
 * ```js
 * <DatePicker defaultValue={new Date(${TODAY.getFullYear()},  ${TODAY.getMonth()}, 15)}
 *             disabled />
 * ```
 * @bit
 */

const datePickerPropTypes = {
  // value related props
  /**
   * @property {Date} defaultValue - (optional) Behaves like the defaultValue property of a native form components. The date can be manipulated through the user interface.
   */
  defaultValue: PropTypes.instanceOf(Date),
  /**
   * @property {Date} value - (optional) Behaves like the value property of a native form components. The date can not be manipulated through the user interface.
   */
  value: PropTypes.instanceOf(Date),
  /**
   * @property {ValueReference} valueLink - (optional) Behaves like the valueLink property of a native form components. ValueLink allows to enable two-way data binding between a state property and the value in the user interface.
   */
  valueLink: PropTypes.shape({
    value: PropTypes.instanceOf(Date),
    requestChange: PropTypes.func.isRequired,
  }),
  /**
   * @property {Date} min - (optional) Sets the minimum date a user can select.
   */
  min: PropTypes.instanceOf(Date),
  /**
   * @property {Date} max - (optional) Sets the maximum date a user can select.
   */
  max: PropTypes.instanceOf(Date),

  // component config related props
  /**
   * @property {String} locale - (optional) Date picker will be rendered according to this locale.
   */
  locale: PropTypes.string,
  month: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * @property {Integer (1-12)} defaultMonth - (optional) When initially rendered the date picker will be display with the provided month.
   */
  defaultMonth: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  year: PropTypes.number,
  /**
   * @property {Integer} defaultYear - (optional) When initially rendered the date picker will be display with the provided year.
   */
  defaultYear: PropTypes.number,
  /**
   * @property {Boolean} showOtherMonthDate - (optional. default: true) This property can be used to show/hide the display of other month dates in date picker. Even if other month dates are displayed in date picker they will be disabled.
   */
  showOtherMonthDate: PropTypes.bool,
  /**
   * @property {Function} renderDay - (optional) This function can be used to distinctly style some day(s).
   */
  renderDay: PropTypes.func,
  tabIndex: PropTypes.number,
  'aria-label': PropTypes.string,
  /**
   * @property {Boolean} disabled - (optional. default: false) When set to true the date picker will be displayed as disabled component. User can do no interaction with this component, it can not even be focused. Disabled date picker is styled differently.
   */
  disabled: PropTypes.bool,
  /**
   * @property {Boolean} readOnly - (optional. default: false) When set to true the date picker will be displayed as read only component. User can focus to read only date picker, change month but will not be able to select some day. Different styling can also be applied to read only date picker.
   */
  readOnly: PropTypes.bool,
  /**
   * @property {Boolean} preventFocusStyleForTouchAndClick - (optional. default: true) Prevents the focus style being applied to the date picker in case the it becomes focused by a click or touch.
   */
  preventFocusStyleForTouchAndClick: PropTypes.bool,

  // event callbacks for wrapper
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onTouchStart: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchCancel: PropTypes.func,

  // callbacks for change of values
  /**
   * @property {Function} onUpdate - (optional) The function will be called when user selects some day.
   */
  onUpdate: PropTypes.func,
  /**
   * @property {Function} onMonthUpdate - (optional) The function will be called when user navigated to different month or year.
   */
  onMonthUpdate: PropTypes.func,

  // props
  dayProps: PropTypes.object,
  navBarProps: PropTypes.object,
  prevMonthNavProps: PropTypes.object,
  prevMonthNavIconProps: PropTypes.object,
  nextMonthNavProps: PropTypes.object,
  nextMonthNavIconProps: PropTypes.object,
  monthLabelProps: PropTypes.object,
  dayLabelProps: PropTypes.object,
  weekHeaderProps: PropTypes.object,
  weekGridProps: PropTypes.object,

  // ClassNames
  className: PropTypes.string,

  // wrapper styles
  style: PropTypes.object,
  disabledStyle: PropTypes.object,
  readOnlyStyle: PropTypes.object,
  hoverStyle: PropTypes.object,
  activeStyle: PropTypes.object,
  focusStyle: PropTypes.object,
  disabledHoverStyle: PropTypes.object,

  // navbar styles
  navBarStyle: PropTypes.object,

  // prevMonthNav styles
  prevMonthNavStyle: PropTypes.object,
  prevMonthNavIconStyle: PropTypes.object,
  hoverPrevMonthNavStyle: PropTypes.object,
  activePrevMonthNavStyle: PropTypes.object,

  // nextMonthNav styles
  nextMonthNavStyle: PropTypes.object,
  nextMonthNavIconStyle: PropTypes.object,
  hoverNextMonthNavStyle: PropTypes.object,
  activeNextMonthNavStyle: PropTypes.object,

  weekHeaderStyle: PropTypes.object,

  // monthlbl styles
  monthLabelStyle: PropTypes.object,

  // daylbl styles
  dayLabelStyle: PropTypes.object,
  disabledDayLabelStyle: PropTypes.object,
  weekendLabelStyle: PropTypes.object,

  // day styles
  dayStyle: PropTypes.object,
  disabledDayStyle: PropTypes.object,
  readOnlyDayStyle: PropTypes.object,
  activeDayStyle: PropTypes.object,
  focusDayStyle: PropTypes.object,
  disabledFocusDayStyle: PropTypes.object,
  /**
   * @property {Object} todayStyl - (optional) The property can be used to add to / change the styling of current date.
   */
  todayStyle: PropTypes.object,
  /**
   * @property {Object} selectedDayStyle - (optional) The property can be used to add to / change the styling of the selected date.
   */
  selectedDayStyle: PropTypes.object,
  /**
   * @property {Object} otherMonthDayStyle - (optional) The property can be used to add to / change the styling of other month day in date picker.
   */
  otherMonthDayStyle: PropTypes.object,
  /**
   * @property {Object} weekendStyle - (optional) The property can be used to add to/change the styling of weekend.
   */
  weekendStyle: PropTypes.object,
};

/*
 * Returns an object with properties that are relevant for the wrapping div of the date picker.
 */
function sanitizeWrapperProps(properties) {
  return omit(properties, Object.keys(datePickerPropTypes));
}

/*
 * Returns an object with properties that are relevant for day span.
 */
function sanitizeEmptyDayProps(properties) {
  return omit(properties, [
    'key',
    'style',
  ]);
}

/*
 * Returns an object with properties that are relevant for day span.
 */
function sanitizeDisabledDayProps(properties) {
  return omit(properties, [
    'key',
    'onMouseEnter',
    'onMouseLeave',
    'style',
  ]);
}

/*
 * Returns an object with properties that are relevant for day span.
 */
function sanitizeDayProps(properties) {
  return omit(properties, [
    'key',
    'onMouseDown',
    'onMouseUp',
    'onMouseEnter',
    'onMouseLeave',
    'onTouchStart',
    'onTouchEnd',
    'onTouchCancel',
    'aria-selected',
    'style',
    'role',
  ]);
}

function sanitizeNavBarProps(properties) {
  return omit(properties, [
    'style',
  ]);
}

function sanitizePrevMonthNavProps(properties) {
  return omit(properties, [
    'aria-label',
    'className',
    'onClick',
    'style',
  ]);
}

function sanitizePrevMonthNavIconProps(properties) {
  return omit(properties, [
    'style',
  ]);
}

function sanitizeNextMonthNavProps(properties) {
  return omit(properties, [
    'aria-label',
    'className',
    'onClick',
    'style',
  ]);
}

function sanitizeNextMonthNavIconProps(properties) {
  return omit(properties, [
    'style',
  ]);
}

function sanitizeMonthLabelProps(properties) {
  return omit(properties, [
    'id',
    'role',
    'style',
  ]);
}

function sanitizeDayLabelProps(properties) {
  return omit(properties, [
    'key',
    'role',
    'style',
  ]);
}

function sanitizeWeekHeaderProps(properties) {
  return omit(properties, [
    'style',
  ]);
}

function sanitizeWeekGridProps(properties) {
  return omit(properties, [
    'role',
    'style',
  ]);
}

/*
 * Injects pseudo classes for styles into the DOM.
 */
function updatePseudoClassStyle(pseudoStyleIds, properties, preventFocusStyleForTouchAndClick) {
  const styles = [
    {
      id: pseudoStyleIds.prevMonthNavStyleId,
      style: {
        ...defaultStyle.hoverPrevMonthNavStyle,
        ...properties.hoverPrevMonthNavStyle,
      },
      pseudoClass: 'hover',

    }, {
      id: pseudoStyleIds.nextMonthNavStyleId,
      style: {
        ...defaultStyle.hoverNextMonthNavStyle,
        ...properties.hoverNextMonthNavStyle,
      },
      pseudoClass: 'hover',
    },
  ];
  let focusStyle;
  if (preventFocusStyleForTouchAndClick) {
    focusStyle = { outline: 0 };
  } else {
    focusStyle = {
      ...defaultStyle.focusStyle,
      ...properties.focusStyle,
    };
  }

  styles.push({
    id: pseudoStyleIds.styleId,
    style: focusStyle,
    pseudoClass: 'focus',
  });
  injectStyles(styles);
}

/*
 * DatePicker React Component.
 *
 * This implementation follows the recommendations proposed here:
 * http://www.w3.org/TR/wai-aria-practices/#datepicker
 */
export default class DatePicker extends Component {

  constructor(properties) {
    super(properties);
    let selectedDate;
    let month;
    let year;

    if (has(properties, 'valueLink')) {
      selectedDate = properties.valueLink.value;
    } else if (has(properties, 'value')) {
      selectedDate = properties.value;
    } else if (has(properties, 'defaultValue')) {
      selectedDate = properties.defaultValue;
    }

    if (properties.defaultMonth) {
      month = properties.defaultMonth - 1;
    } else if (selectedDate) {
      month = selectedDate.getMonth();
    } else {
      month = today().getMonth();
    }

    if (properties.defaultYear) {
      year = properties.defaultYear;
    } else if (selectedDate) {
      year = selectedDate.getFullYear();
    } else {
      year = today().getFullYear();
    }

    this.state = {
      isFocused: false,
      isActive: false,
      selectedDate,
      month,
      year,
    };

    this.localeData = getLocaleData(properties.locale);
    this.wrapperProps = sanitizeWrapperProps(properties);
    this.dayProps = sanitizeDayProps(properties.dayProps);
    this.disabledDayProps = sanitizeDisabledDayProps(properties.dayProps);
    this.emptyDayProps = sanitizeEmptyDayProps(properties.dayProps);
    this.navBarProps = sanitizeNavBarProps(properties.navBarProps);
    this.prevMonthNavProps = sanitizePrevMonthNavProps(properties.prevMonthNavProps);
    this.prevMonthNavIconProps = sanitizePrevMonthNavIconProps(properties.prevMonthNavIconProps);
    this.nextMonthNavProps = sanitizeNextMonthNavProps(properties.nextMonthNavProps);
    this.nextMonthNavIconProps = sanitizeNextMonthNavIconProps(properties.nextMonthNavIconProps);
    this.monthLabelProps = sanitizeMonthLabelProps(properties.monthLabelProps);
    this.dayLabelProps = sanitizeDayLabelProps(properties.dayLabelProps);
    this.weekHeaderProps = sanitizeWeekHeaderProps(properties.weekHeaderProps);
    this.weekGridProps = sanitizeWeekGridProps(properties.weekGridProps);

    this.preventFocusStyleForTouchAndClick = has(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : config.preventFocusStyleForTouchAndClick;
  }

  static displayName = 'DatePicker';

  static propTypes = datePickerPropTypes;

  static defaultProps = {
    tabIndex: 0,
    'aria-label': 'datepicker',
    disabled: false,
    readOnly: false,
    showOtherMonthDate: true,
  };

  /*
   * Generates the style-id based on React's unique DOM node id.
   * Calls function to inject the pseudo classes into the dom.
   */
  componentWillMount() {
    const id = uniqueId();
    this.pseudoStyleIds = {};
    this.pseudoStyleIds.styleId = `wrapper-style-id${id}`;
    this.pseudoStyleIds.prevMonthNavStyleId = `prevMonthNav-style-id${id}`;
    this.pseudoStyleIds.nextMonthNavStyleId = `nextMonthNav-style-id${id}`;
    updatePseudoClassStyle(this.pseudoStyleIds, this.props, this.preventFocusStyleForTouchAndClick);
  }

  /*
   * Function will update component state and styles as new props are received.
   */
  componentWillReceiveProps(properties) {
    const newState = {};

    if (has(properties, 'valueLink')) {
      newState.selectedDate = properties.valueLink.value;
    } else if (has(properties, 'value')) {
      newState.selectedDate = properties.value;
    }

    this.setState(newState);

    this.localeData = getLocaleData(properties.locale);
    this.wrapperProps = sanitizeWrapperProps(properties);
    this.dayProps = sanitizeDayProps(properties.dayProps);
    this.disabledDayProps = sanitizeDisabledDayProps(properties.dayProps);
    this.emptyDayProps = sanitizeEmptyDayProps(properties.dayProps);
    this.navBarProps = sanitizeNavBarProps(properties.navBarProps);
    this.prevMonthNavProps = sanitizePrevMonthNavProps(properties.prevMonthNavProps);
    this.prevMonthNavIconProps = sanitizePrevMonthNavIconProps(properties.prevMonthNavIconProps);
    this.nextMonthNavProps = sanitizeNextMonthNavProps(properties.nextMonthNavProps);
    this.nextMonthNavIconProps = sanitizeNextMonthNavIconProps(properties.nextMonthNavIconProps);
    this.monthLabelProps = sanitizeMonthLabelProps(properties.monthLabelProps);
    this.dayLabelProps = sanitizeDayLabelProps(properties.dayLabelProps);
    this.weekHeaderProps = sanitizeWeekHeaderProps(properties.weekHeaderProps);
    this.weekGridProps = sanitizeWeekGridProps(properties.weekGridProps);

    this.preventFocusStyleForTouchAndClick = has(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : config.preventFocusStyleForTouchAndClick;

    removeAllStyles(Object.keys(this.pseudoStyleIds));
    updatePseudoClassStyle(this.pseudoStyleIds, properties, this.preventFocusStyleForTouchAndClick);
  }

  /*
   * Removes pseudo classes from the DOM once component gets unmounted.
   */
  componentWillUnmount() {
    removeAllStyles(Object.keys(this.pseudoStyleIds));
  }

  /*
   * Callback is called when wrapper is focused, it will conditionally set isFocused.
   *
   * In addition this.state.focusedDateKey will be set to current date of whichever month is displayed on date-picker (if this.state.focusedDateKey is undefined).
   */
  _onFocus = () => {
    if (!this.props.disabled) {
      if (!this.state.isActive) {
        const newState = {
          isFocused: true,
        };
        if (!this.state.focusedDateKey) {
          if (this.state.selectedDate && this.state.selectedDate.getMonth() === this.state.month && this.state.selectedDate.getFullYear() === this.state.year) {
            newState.focusedDateKey = convertDateToDateKey(this.state.selectedDate);
          } else if (this.state.month === today().getMonth() && this.state.year === today().getFullYear()) {
            newState.focusedDateKey = getDateKey(today().getFullYear(), today().getMonth() + 1, today().getDate());
          } else {
            newState.focusedDateKey = getDateKey(this.state.year, this.state.month + 1, 1);
          }
        }

        this.setState(newState);
      }
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  /*
   * Callback is called when wrapper is blurred, it will reset isFocused, focusedDateKey.
   */
  _onBlur = () => {
    if (!this.props.disabled) {
      this.setState({
        isFocused: false,
        focusedDateKey: undefined,
      });
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  /*
    * Callback is called when wrapper receives mouseDown. Conditionally set isActive.
    */
  _onMouseDown = (event) => {
    if (!this.props.disabled && event.button === 0) {
      this.setState({
        isActive: true,
      });
    }

    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  };

  /*
   * Callback is called when wrapper receives mouseUp. Reset isActive.
   */
  _onMouseUp = (event) => {
    if (!this.props.disabled && event.button === 0) {
      this.setState({
        isActive: false,
      });
    }

    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }
  };

  /*
   * Callback is called when touch starts on wrapper. Conditionally sets isActive.
   */
  _onTouchStart = (event) => {
    if (!this.props.disabled && event.touches.length === 1) {
      this.setState({
        isActive: true,
      });
    }

    if (this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }
  };

  /*
   * Callback is called when touch ends on wrapper. Reset isActive.
   */
  _onTouchEnd = () => {
    if (!this.props.disabled) {
      this.setState({
        isActive: false,
      });
    }

    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  };

  _onTouchCancel = () => {
    this.setState({
      isActive: false,
    });

    if (this.props.onTouchCancel) {
      this.props.onTouchCancel(event);
    }
  };

  /*
   * On keyDown on wrapper if date-picker is not disabled and some day is focused:
   * 1. arrow keys will navigate calendar
   * 2. enter key will set selectedDate of component
   * 3. space key will set / unset selectedDate
   * 4. props.onKeyDown will be called
   */
  _onKeyDown = (event) => {
    if (!this.props.disabled) {
      if (event.key === 'Home') {
        // Moves to the first day of the current month.
        event.preventDefault();
        this._focusOnTheFistDayOfTheMonth();
      } else if (event.key === 'End') {
        // Moves to the last day of the current month.
        event.preventDefault();
        const date = getLastDayForMonth(this.state.year, this.state.month);
        this.setState({
          focusedDateKey: convertDateToDateKey(date),
        });
      }

      if (this.state.focusedDateKey) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          this._focusOtherDay(7);
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          this._focusOtherDay(-7);
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          this._focusOtherDay(this.localeData.isRTL ? 1 : -1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          this._focusOtherDay(this.localeData.isRTL ? -1 : 1);
        } else if (event.key === 'PageUp') {
          this._onPageUpKeyDown(event);
        } else if (event.key === 'PageDown') {
          this._onPageDownKeyDown(event);
        } else if (event.key === 'Enter') {
          event.preventDefault();
          const date = getDateForDateKey(this.state.focusedDateKey);
          if (this._isWithinMinAndMax(date)) {
            this._triggerSelectDate(date.getDate(), date.getMonth(), date.getFullYear());
          }
        } else if (event.key === ' ') {
          event.preventDefault();
          const date = getDateForDateKey(this.state.focusedDateKey);
          if (this._isWithinMinAndMax(date)) {
            this._triggerToggleDate(date);
          }
        }
      } else {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' ||
            event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          this._focusOnFallbackDay();
        }
      }
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  };

  /*
   * Function will handle pageUp key down event.
   */
  _onPageUpKeyDown = (event) => {
    // Moves to the same date in the previous month.
    event.preventDefault();

    // TODO extract this to a helper function and test various edge cases
    let date;
    const lastDayInMonth = getLastDayForMonth(this.state.year, this.state.month - 1);
    const focusedDate = getDateForDateKey(this.state.focusedDateKey);

    // jump from March 30 to Feb 29
    if (focusedDate.getDate() > lastDayInMonth.getDate()) {
      date = lastDayInMonth;
    } else {
      date = getDateForDateKey(this.state.focusedDateKey);
      date.setMonth(date.getMonth() - 1);
    }

    this.setState({
      focusedDateKey: convertDateToDateKey(date),
      month: date.getMonth(),
      year: date.getFullYear(),
      lastHoveredDay: undefined,
    });
  };

  /*
   * Function will handle pageDown key down event.
   */
  _onPageDownKeyDown = (event) => {
    // Moves to the same date in the next month.
    event.preventDefault();

    // TODO extract this to a helper function and test various edge cases
    let date;
    const lastDayInMonth = getLastDayForMonth(this.state.year, this.state.month + 1);
    const focusedDate = getDateForDateKey(this.state.focusedDateKey);

    // Use case: Jump from Jan 31 to Feb 29
    if (focusedDate.getDate() > lastDayInMonth.getDate()) {
      date = lastDayInMonth;
    } else {
      date = getDateForDateKey(this.state.focusedDateKey);
      date.setMonth(date.getMonth() + 1);
    }

    this.setState({
      focusedDateKey: convertDateToDateKey(date),
      month: date.getMonth(),
      year: date.getFullYear(),
      lastHoveredDay: undefined,
    });
  };

  /*
   * Callback is called when some day receives mouseDown.
   * It will conditionally set this.state.activeDay, this.state.focusedDateKey and call props.onDayMouseDown.
   *
   * Note: mouseEvent.button is supported by all browsers are are targeting: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
   */
  _onDayMouseDown = (dateKey, event) => {
    if (event.button === 0 && !this.props.disabled && !this.props.readOnly) {
      this.setState({
        activeDay: dateKey,
      });
    }

    if (this.props.dayProps && this.props.dayProps.onMouseDown) {
      this.props.dayProps.onMouseDown(event);
    }
  };

  /*
   * Callback is called when some day receives mouseUp.
   * It will reset this.state.activeDay and call props.onDayMouseUp.
   */
  _onDayMouseUp = (dateKey, event) => {
    if (event.button === 0 && !this.props.disabled && !this.props.readOnly && this.state.activeDay === dateKey) {
      const date = getDateForDateKey(dateKey);
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      this._triggerSelectDate(day, month, year);
      this.setState({
        // Note: updating focusedDateKey in mouseEnter normally would be good enough,
        // but it is necessary to set on mouseUp for the following edge case:
        // A user moves the cursor over a day. Moves on with the keyboard and
        // then without moving again just pressing the mouse. In this case
        // mouseEnter did not get called again.
        focusedDateKey: dateKey,
        activeDay: undefined,
      });
    }

    if (this.props.dayProps && this.props.dayProps.onMouseUp) {
      this.props.dayProps.onMouseUp(event);
    }
  };

  /*
   * Callback is called when some day receives MouseEnter. It will conditionally set this.state.focusedDateKey.
   */
  _onDayMouseEnter = (dateKey, event) => {
    if (!this.props.readOnly) {
      this.setState({
        focusedDateKey: dateKey,
      });
    }

    if (this.props.dayProps && this.props.dayProps.onMouseEnter) {
      this.props.dayProps.onMouseEnter(event);
    }
  };

  /*
   * Callback is called when some day receives MouseLeave. It will reset this.state.focusedDateKey.
   */
  _onDayMouseLeave = (dateKey, event) => {
    if (!this.props.readOnly && event.button === 0 && this.state.focusedDateKey === dateKey) {
      this.setState({
        focusedDateKey: undefined,
        lastHoveredDay: this.state.focusedDateKey,
      });
    }

    if (this.props.dayProps && this.props.dayProps.onMouseLeave) {
      this.props.dayProps.onMouseLeave(event);
    }
  };

  /*
   * Callback is called when some day receives touchStart.
   * It will conditionally set this.state.activeDay and call props.onDayTouchStart.
   */
  _onDayTouchStart = (dateKey, event) => {
    if (!this.props.disabled && !this.props.readOnly && event.touches.length === 1) {
      this.setState({
        activeDay: dateKey,
      });
    }

    if (this.props.dayProps && this.props.dayProps.onTouchStart) {
      this.props.dayProps.onTouchStart(event);
    }
  };

  /*
   * Callback is called when some day receives touchEnd.
   * It will reset this.state.activeDay and call props.onDayTouchEnd.
   */
  _onDayTouchEnd = (dateKey, event) => {
    if (!this.props.disabled && !this.props.readOnly) {
      const date = getDateForDateKey(dateKey);
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      this._triggerSelectDate(day, month, year);
      if (this.state.activeDay === dateKey) {
        this.setState({
          activeDay: undefined,
        });
      }
    }

    if (this.props.dayProps && this.props.dayProps.onTouchEnd) {
      this.props.dayProps.onTouchEnd(event);
    }
  };

  _onDayTouchCancel = (dateKey, event) => {
    this.setState({
      activeDay: undefined,
    });

    if (this.props.dayProps && this.props.dayProps.onTouchCancel) {
      this.props.dayProps.onTouchCancel(event);
    }
  };

  /*
   * Depending on whether component is controlled or uncontrolled the function will update this.state.selectedDate.
   * It will also call props.onUpdate.
   */
  _triggerSelectDate(day, month, year) {
    if (!this.props.disabled && !this.props.readOnly) {
      const selectedDate = day ? new Date(year, month, day) : undefined;

      if (has(this.props, 'valueLink')) {
        this.props.valueLink.requestChange(selectedDate);
      } else if (!has(this.props, 'value')) {
        this.setState({
          selectedDate,
          month,
          year,
        });
      }

      if (this.props.onUpdate) {
        this.props.onUpdate({
          value: selectedDate,
        });
      }
    }
  }

  /*
   * Function will select / deselect date passed to it, it is used in case of 'Space' keyDown on a day.
   */
  _triggerToggleDate(date) {
    if (!this.props.disabled && !this.props.readOnly) {
      let day;
      let month;
      let year;
      if (this.state.selectedDate && date &&
          this.state.selectedDate.getDate() === date.getDate() && this.state.selectedDate.getMonth() === date.getMonth() && this.state.selectedDate.getFullYear() === date.getFullYear()) {
        day = undefined;
        month = this.state.month;
        year = this.state.year;
      } else {
        day = date.getDate();
        month = date.getMonth();
        year = date.getFullYear();
      }

      this._triggerSelectDate(day, month, year);
    }
  }

  _focusOnTheFistDayOfTheMonth() {
    this.setState({
      focusedDateKey: `${this.state.year}-${this.state.month + 1}-1`,
    });
  }

  _focusOnFallbackDay() {
    if (this.state.lastHoveredDay) {
      this.setState({
        focusedDateKey: this.state.lastHoveredDay,
      });
    } else {
      this._focusOnTheFistDayOfTheMonth();
    }
  }

  /*
   * The function is mainly used when some day is focused and Arrow keys are pressed to navigate to some other day.
   * days is the number of days by which focused should be moved ahead or behind.
   */
  _focusOtherDay(days) {
    const focusedDate = getDateForDateKey(this.state.focusedDateKey);
    const currentMonth = focusedDate.getMonth();

    const nextFocusedDate = getDateForDateKey(this.state.focusedDateKey);
    nextFocusedDate.setDate(nextFocusedDate.getDate() + days);
    const nextFocusedDateKey = convertDateToDateKey(nextFocusedDate);
    const nextMonth = nextFocusedDate.getMonth();

    if (nextMonth !== currentMonth) {
      if ((nextMonth < currentMonth || (nextMonth === 11 && currentMonth === 0)) &&
          !(nextMonth === 0 && currentMonth === 11)) {
        this._decreaseMonthYear();
      } else if ((nextMonth > currentMonth || (nextMonth === 0 && currentMonth === 11)) &&
          !(nextMonth === 11 && currentMonth === 0)) {
        this._increaseMonthYear();
      }
    }

    this.setState({
      focusedDateKey: nextFocusedDateKey,
    });
  }

  /*
   * The function will decrease current month in state. It will also call props.onMonthUpdate.
   */
  _decreaseMonthYear() {
    let newMonth;
    let newYear;
    if (this.state.month === 0) {
      newMonth = 11;
      newYear = this.state.year - 1;
    } else {
      newMonth = this.state.month - 1;
      newYear = this.state.year;
    }

    this.setState({
      month: newMonth,
      year: newYear,
      focusedDateKey: undefined,
      lastHoveredDay: undefined,
    });
    if (this.props.onMonthUpdate) {
      this.props.onMonthUpdate(newMonth + 1, newYear);
    }
  }

  /*
   * The function will increase current month in state. It will also call props.onMonthUpdate.
   */
  _increaseMonthYear() {
    let newMonth;
    let newYear;
    if (this.state.month === 11) {
      newMonth = 0;
      newYear = this.state.year + 1;
    } else {
      newMonth = this.state.month + 1;
      newYear = this.state.year;
    }

    this.setState({
      month: newMonth,
      year: newYear,
      focusedDateKey: undefined,
      lastHoveredDay: undefined,
    });
    if (this.props.onMonthUpdate) {
      this.props.onMonthUpdate(newMonth + 1, newYear);
    }
  }

  _isWithinMinAndMax(date) {
    return !(this.props.min && date < this.props.min ||
             this.props.max && date > this.props.max);
  }

  _onClickPrevMonth = () => {
    this._decreaseMonthYear();
    if (this.props.prevMonthNavProps && this.props.prevMonthNavProps.onClick) {
      this.props.prevMonthNavProps.onClick(event);
    }
  };

  _onClickNextMonth = () => {
    this._increaseMonthYear();
    if (this.props.nextMonthNavProps && this.props.nextMonthNavProps.onClick) {
      this.props.nextMonthNavProps.onClick(event);
    }
  };

  _renderPrevMonthNav() {
    const prevMonthNavStyle = {
      ...defaultStyle.prevMonthNavStyle,
      ...this.props.prevMonthNavStyle,
    };

    const prevMonthNavIconStyle = {
      ...defaultStyle.prevMonthNavIconStyle,
      ...this.props.prevMonthNavIconStyle,
    };

    let className = this.pseudoStyleIds.prevMonthNavStyleId;
    if (this.props.prevMonthNavProps) {
      className = unionClassNames(this.props.prevMonthNavProps.className, className);
    }

    return (
      <ActionArea
        onUpdate={ this._onClickPrevMonth }
        style={ prevMonthNavStyle }
        className={ className }
        aria-label="Go to previous month"
        { ...this.prevMonthNavProps }
      >
        <div
          style={ prevMonthNavIconStyle }
          { ...this.prevMonthNavIconProps }
        />
      </ActionArea>
    );
  }

  _renderNextMonthNav() {
    const nextMonthNavStyle = {
      ...defaultStyle.nextMonthNavStyle,
      ...this.props.nextMonthNavStyle,
    };

    const nextMonthNavIconStyle = {
      ...defaultStyle.nextMonthNavIconStyle,
      ...this.props.nextMonthNavIconStyle,
    };

    let className = this.pseudoStyleIds.nextMonthNavStyleId;
    if (this.props.nextMonthNavProps) {
      className = unionClassNames(this.props.nextMonthNavProps.className, className);
    }

    return (
      <ActionArea
        onUpdate={ this._onClickNextMonth }
        style= { nextMonthNavStyle }
        className={ className }
        aria-label="Go to next month"
        { ...this.nextMonthNavProps }
      >
        <div
          style={ nextMonthNavIconStyle }
          { ...this.nextMonthNavIconProps }
        />
      </ActionArea>
    );
  }

  /*
   * Function will return jsx for rendering the nav bar for calendar.
   * Depending on following rules it will apply styles to prevMonthNav and nextMonthNav:
   * 1. If disabled hide navs
   * 2. If active apply activeStyles
   */
  _renderNavBar() {
    const navBarStyle = {
      ...defaultStyle.navBarStyle,
      ...this.props.navBarStyle,
    };
    const monthLabelStyle = {
      ...defaultStyle.monthLabelStyle,
      ...this.props.monthLabelStyle,
    };

    return (
      <div
        style={ navBarStyle }
        { ...this.navBarProps }
      >
        { this._renderPrevMonthNav() }
        <span
          style={ monthLabelStyle }
          role="heading"
          /*
            This label has an id as suggested in http://www.w3.org/TR/wai-aria-practices/#datepicker
          */
          id={ `${this.state.year}-${this.state.month}` }
          { ...this.monthLabelProps }
        >
          { `${this.localeData.monthNames[this.state.month]} ${this.state.year}` }
        </span>
        { this._renderNextMonthNav() }
      </div>
    );
  }

  /*
   * Function will return jsx for rendering the week header for calendar.
   * Disabled styles will be applied for disabled date-picker.
   * Day headers will be rendered using locale information.
   */
  _renderWeekHeader() {
    const weekHeaderStyle = {
      ...defaultStyle.weekHeaderStyle,
      ...this.props.weekHeaderStyle,
    };

    let dayLabelStyle = {
      ...defaultStyle.dayLabelStyle,
      ...this.props.dayLabelStyle,
    };
    if (this.props.disabled) {
      dayLabelStyle = {
        ...dayLabelStyle,
        ...defaultStyle.disabledDayLabelStyle,
        ...this.props.disabledDayLabelStyle,
      };
    }

    const weekendLabelStyle = {
      ...dayLabelStyle,
      ...defaultStyle.weekendLabelStyle,
      ...this.props.weekendLabelStyle,
    };
    let dayNames = shift(this.localeData.dayNamesMin, this.localeData.firstDay);
    dayNames = this.localeData.isRTL ? reverse(dayNames) : dayNames;
    let weekendIndex = ((7 - this.localeData.firstDay) % 7) + this.localeData.weekEnd;
    weekendIndex = this.localeData.isRTL ? 6 - weekendIndex : weekendIndex;

    return (
      <div
        style={ weekHeaderStyle }
        { ...this.weekHeaderProps }
      >
        {
          map(dayNames, (dayAbbr, index) => ((
            <span
              key={ `dayAbbr-${index}` }
              style={ index === weekendIndex ? weekendLabelStyle : dayLabelStyle }
              role="columnheader"
              { ...this.dayLabelProps }
            >
              { dayAbbr }
            </span>
          )))
        }
      </div>
    );
  }

  /*
   * Function will return jsx for rendering the a day.
   * It will apply various styles in sequence as below (styles will be additive):
   * 1. If component is readOnly apply readOnly styles
   * 2. If component is disabled apply disabled styles
   *    - If component is disabled and hovered apply disableHover styles
   * 3. If day is weekend apply weekendStyle
   * 4. If its day in current month and component is not disabled or readOnly:
   *    - If its current day apply todayStyle
   *    - If this is selected day apply selectedDayStyle
   *    - If component is hovered apply hover styles
   *    - If component is hovered and active apply hoveredStyles + activeStyles
   *    - If component is hovered and not active but focused and preventFocusStyleForTouchAndClick apply focus styles
   * 5. If current day represents other months day in calendar apply otherMonthDayStyle
   */
  _renderDay(currentDate, index) {
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const isOtherMonth = month !== this.state.month;
    const dateKey = convertDateToDateKey(currentDate);
    const isDisabledDay = !this._isWithinMinAndMax(currentDate);

    let ariaSelected = false;

    let dayStyle = {
      ...defaultStyle.dayStyle,
      ...this.props.dayStyle,
    };

    if (this.props.readOnly) {
      dayStyle = {
        ...dayStyle,
        ...defaultStyle.readOnlyDayStyle,
        ...this.props.readOnlyDayStyle,
      };
    }

    if (isOtherMonth) {
      dayStyle = {
        ...dayStyle,
        ...defaultStyle.otherMonthDayStyle,
        ...this.props.otherMonthDayStyle,
      };
    }

    if (this.props.disabled || isDisabledDay) {
      dayStyle = {
        ...dayStyle,
        ...defaultStyle.disabledDayStyle,
        ...this.props.disabledDayStyle,
      };
    }

    if (currentDate.getDay() === this.localeData.weekEnd) {
      dayStyle = {
        ...dayStyle,
        ...defaultStyle.weekendStyle,
        ...this.props.weekendStyle,
      };
    }

    if (day === today().getDate() && month === today().getMonth() && year === today().getFullYear()) {
      dayStyle = {
        ...dayStyle,
        ...defaultStyle.todayStyle,
        ...this.props.todayStyle,
      };
    }

    if (this.state.selectedDate && day === this.state.selectedDate.getDate()
      && currentDate.getMonth() === this.state.selectedDate.getMonth() && currentDate.getFullYear() === this.state.selectedDate.getFullYear()) {
      dayStyle = {
        ...dayStyle,
        ...defaultStyle.selectedDayStyle,
        ...this.props.selectedDayStyle,
      };
      ariaSelected = true;
    }

    if (this.state.focusedDateKey === dateKey) {
      dayStyle = {
        ...dayStyle,
        ...defaultStyle.focusDayStyle,
        ...this.props.focusDayStyle,
      };
      if (this.props.disabled || isDisabledDay) {
        dayStyle = {
          ...dayStyle,
          ...defaultStyle.disabledFocusDayStyle,
          ...this.props.disabledFocusDayStyle,
        };
      }
    }

    if (!this.props.disabled && !this.props.readOnly && this.state.activeDay === dateKey) {
      dayStyle = {
        ...dayStyle,
        ...defaultStyle.activeDayStyle,
        ...this.props.activeDayStyle,
      };
    }

    const renderedDay = this.props.renderDay ? this.props.renderDay(currentDate) : day;

    if (!this.props.showOtherMonthDate && isOtherMonth) {
      return (
        <span
          key={ `day-${index}` }
          style={ dayStyle }
          {...this.emptyDayProps}
        />
      );
    }

    if (isDisabledDay) {
      return (
        <DisabledDay
          key={ `day-${index}` }
          style={ dayStyle }
          dateKey={ dateKey }
          onDayMouseEnter={ this._onDayMouseEnter }
          onDayMouseLeave={ this._onDayMouseLeave }
          disabledDayProps={ this.disabledDayProps }
        >
          { renderedDay }
        </DisabledDay>
      );
    }

    return (
      <Day
        key={ `day-${index}` }
        dateKey={ dateKey }
        onDayMouseDown={ this._onDayMouseDown }
        onDayMouseUp={ this._onDayMouseUp }
        onDayMouseEnter={ this._onDayMouseEnter }
        onDayMouseLeave={ this._onDayMouseLeave }
        onDayTouchStart={ this._onDayTouchStart }
        onDayTouchEnd={ this._onDayTouchEnd }
        onDayTouchCancel={ this._onDayTouchCancel }
        selected={ ariaSelected }
        style={ dayStyle }
        dayProps={this.dayProps}
      >
        { renderedDay }
      </Day>
    );
  }

  /*
   * Function will render:
   * - main calendar component
   * - call methods to render navBar and week header
   * - get array of weeks in a month and for each day in the week call method to render day
   *
   * It will apply styles sequentially according to Wrapper according to following rules:
   * 1. If component is readOnly apply readOnlyStyle
   * 2. If component is disabled apply disabledStyle
   *    - If disabled component is hovered apply disabledHoverStyle
   * 3. If component is not disabled:
   *    - If component is hovered apply hover style
   *    - If component is hovered and active apply hover + active styles
   *    - If component is hovered and focused but not active and preventFocusStyleForTouchAndClick is true apply focusStyles
   */
  render() {
    let style = {
      ...defaultStyle.style,
      ...this.props.style,
    };
    if (this.props.readOnly) {
      style = {
        ...style,
        ...defaultStyle.readOnlyStyle,
        ...this.props.readOnlyStyle,
      };
    }

    if (this.props.disabled) {
      style = {
        ...style,
        ...defaultStyle.disabledStyle,
        ...this.props.disabledStyle,
      };
    }

    if (this.preventFocusStyleForTouchAndClick && this.state.isFocused) {
      style = {
        ...style,
        ...defaultStyle.focusStyle,
        ...this.props.focusStyle,
      };
    }

    if (this.state.isActive) {
      style = {
        ...style,
        ...defaultStyle.activeStyle,
        ...this.props.activeStyle,
      };
    }

    const weekArray = getWeekArrayForMonth(this.state.month, this.state.year, this.localeData.firstDay);

    const tabIndex = !this.props.disabled ? this.props.tabIndex : false;

    return (
      <div
        tabIndex={ tabIndex }
        onFocus={ this._onFocus }
        onBlur={ this._onBlur }
        onKeyDown={ this._onKeyDown }
        onMouseDown={ this._onMouseDown }
        onMouseUp={ this._onMouseUp }
        onTouchStart={ this._onTouchStart }
        onTouchEnd={ this._onTouchEnd }
        onTouchCancel={ this._onTouchCancel }
        aria-label={ this.props['aria-label'] }
        aria-disabled={ this.props.disabled }
        aria-readonly={ this.props.readOnly }
        style={ style }
        className={
         unionClassNames(this.props.className, this.pseudoStyleIds.styleId)
        }
        {...this.wrapperProps}
      >
        { this._renderNavBar() }
        <div
          role="grid"
          style={ defaultStyle.weekGridStyle }
          { ...this.weekGridProps }
        >
          { this._renderWeekHeader() }
          {
            map(weekArray, (week) => {
              const weekDays = this.localeData.isRTL ? reverse(week) : week;
              return map(weekDays, (day, dayIndex) => this._renderDay(day, dayIndex));
            })
          }
        </div>
      </div>
    );
  }
}
