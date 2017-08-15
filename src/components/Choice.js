import React, { Component, PropTypes } from 'react';

/**
 * ## Belle's choice component for use with the toggle component.
 * In addition to the props listed below, you can also use any any other property valid for a HTML div like style, id, className, …
 *
 * &nbsp;
 * ## More info
 * See live [examples](https://gideonshils.github.io/Belle-With-Bit/).
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/choice?_k=jaxgej) documentation.
 * 
 * &nbsp;
 * ## Standard example
 * ```js
 * <!-- toggle with custom choices -->
 * <Toggle defaultValue>
 * <Choice value>On</Choice>
 * <Choice value={ false }>Off</Choice>
 * </Toggle>
 * ```
 * @bit
 */
export default class Choice extends Component {

  static displayName = 'Choice';

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    /**
     * @property {Boolean} value - (required) The value to be set in case this Choice is set.
     */
    value: PropTypes.bool.isRequired,
  };

  render() {
    return <div>{this.props.children}</div>;
  }
}
