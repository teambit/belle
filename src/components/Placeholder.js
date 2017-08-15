import React, { Component, PropTypes } from 'react';
import omit from '../utils/helpers/omit';
import style from '../style/placeholder';

/**
 * ## Belle's placeholder component. Should be used together with Belle's Select
 * 
 * In addition to the props listed below, you can also use any property valid for a HTML div like style, id, className, ...
 * 
 * &nbsp;
 * ## More info
 * See live [examples](https://gideonshils.github.io/Belle-With-Bit/).
 * 
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/placeholder?_k=parg4w) documentation.
 *
 * &nbsp;
 * ## Standard example
 * ```js
 * <!-- basic select example with a placeholder -->
 * <Select>
 * <Placeholder>Choose a City</Placeholder>
 * <Option value="tokyo">Tokyo</Option>
 * <Option value="vienna">Vienna</Option>
 * </Select>
 * ```
 * @bit
 */

const placeholderPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.object,
  disabledStyle: PropTypes.object,
  _isDisabled: PropTypes.bool,
};

/*
 * Returns an object with properties that are relevant for the wrapping div.
 */
function sanitizeChildProps(properties) {
  return omit(properties, Object.keys(placeholderPropTypes));
}

/*
 * Placeholder component.
 *
 * This component should be used together with Belle's Select.
 */
export default class Placeholder extends Component {

  constructor(properties) {
    super(properties);
    this.state = {
      childProps: sanitizeChildProps(properties),
    };
  }

  static displayName = 'Placeholder';

  static propTypes = placeholderPropTypes;

  static defaultProps = {
    _isDisabled: false,
  };

  /*
   * Update the childProps based on the updated properties passed to the
   * Placeholder.
   */
  componentWillReceiveProps(properties) {
    this.setState({ childProps: sanitizeChildProps(properties) });
  }

  render() {
    let computedStyle = {
      ...style.style,
      ...this.props.style,
    };
    if (this.props._isDisabled) {
      computedStyle = {
        ...computedStyle,
        ...style.disabledStyle,
        ...this.props.disabledStyle,
      };
    }

    return (
      <div style={ computedStyle } {...this.state.childProps}>
        { this.props.children }
      </div>
    );
  }
}
