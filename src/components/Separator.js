import React, { Component, PropTypes } from 'react';
import omit from '../utils/helpers/omit';
import style from '../style/separator';

/**
 * ## Belle's separator component. Should be used together with Belle's Select.
 * 
 * In addition to the props listed below, you can also use any property valid for a HTML div like style, id, className, ...
 *
 * &nbsp;
 * ## More info
 * See live [examples](https://gideonshils.github.io/Belle-With-Bit/).
 * 
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/separator?_k=gntekj) documentation.
 * 
 * &nbsp;
 * ## Standard example
 * ```js
 * <!-- basic select example with separators -->
 * <Select>
 * <Separator>America</Separator>
 * <Option value="san-francisco">San Francisco</Option>
 * <Option value="vancouver">Vancouver</Option>
 * <Separator>Asia</Separator>
 * <Option value="hong-kong">Hong Kong</Option>
 * <Option value="tokyo">Tokyo</Option>
 * <Separator>Europe</Separator>
 * <Option value="berlin">Berlin</Option>
 * <Option value="istanbul">Istanbul</Option>
 * <Option value="rome">Rome</Option>
 * <Option value="vienna">Vienna</Option>
 * </Select>
 * ```
 * @bit
 */

const separatorPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.object,
};

/*
 * Returns an object with properties that are relevant for the wrapping div.
 */
function sanitizeChildProps(properties) {
  return omit(properties, Object.keys(separatorPropTypes));
}

/*
 * Separator component.
 *
 * This component should be used together with Belle's Select.
 */
export default class Separator extends Component {

  constructor(properties) {
    super(properties);
    this.state = {
      childProps: sanitizeChildProps(properties),
    };
  }

  static displayName = 'Separator';

  static propTypes = separatorPropTypes;

  /*
   * Update the childProperties based on the updated properties passed to the
   * Separator.
   */
  componentWillReceiveProps(properties) {
    this.setState({ childProps: sanitizeChildProps(properties) });
  }

  render() {
    const computedStyle = {
      ...style.style,
      ...this.props.style,
    };

    return (
      <div style={ computedStyle } {...this.state.childProps}>
        { this.props.children }
      </div>
    );
  }
}
