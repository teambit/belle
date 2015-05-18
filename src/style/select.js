"use strict";

var selectStyle = {

  style: {
    borderBottom: '1px solid #CCC',
    boxSizing: 'border-box',
    cursor: 'pointer',
    height: 34,
    padding: '7px 0 5px 0',
    position: 'relative'
  },

  focusStyle: {
    borderBottom: '1px solid #6EB8D4',
    boxSizing: 'border-box',
    cursor: 'pointer',
    height: 34,
    padding: '7px 0 5px 0',
    position: 'relative'
  },

  hoverStyle: {
    borderBottom: '1px solid #92D6EF',
    boxSizing: 'border-box',
    cursor: 'pointer',
    padding: '7px 0 5px 0',
    position: 'relative'
  },

  wrapperStyle: {
    outline: 0, // to avoid default focus behaviour
    boxSizing: 'border-box',
    position: 'relative'
  },

  optionsAreaStyle: {
    display: 'block',
    listStyleType: 'none',
    background: '#FFF',
    padding: '6px 0',
    margin: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 10000,
    boxSizing: 'border-box',
    borderRadius: 2,
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
    borderTop: '1px solid #f2f2f2',
    top: 0
  },

  caretToOpenStyle: {
    height: 0,
    width: 0,
    content: ' ',
    position: 'absolute',
    top: 15,
    right: 8,
    borderTop: '6px solid #666',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent'
  },

  caretToCloseStyle: {
    height: 0,
    width: 0,
    content: ' ',
    position: 'absolute',
    top: 15,
    right: 8,
    borderBottom: '6px solid #666',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent'
  }

};

export default selectStyle;
