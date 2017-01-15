import React from 'react'
import DialButton from './DialButton'
import _ from 'underscore'

export default class DialPad extends React.Component {
  createButtons() {
    const { onClick, compact } = this.props
    const buttons = [
      {
        symbol : '1'
      },
      {
        symbol : '2',
        alias  : 'abc'
      },
      {
        symbol : '3',
        alias  : 'def'
      },
      {
        symbol : '4',
        alias  : 'ghi'
      },
      {
        symbol : '5',
        alias  : 'jkl'
      },
      {
        symbol : '6',
        alias  : 'mno'
      },
      {
        symbol : '7',
        alias  : 'pqrs'
      },
      {
        symbol : '8',
        alias  : 'tuv'
      },
      {
        symbol : '9',
        alias  : 'wxyz'
      },
      {
        symbol : ''
      },
      {
        symbol : '0'
      },
      {
        symbol : ''
      }/*,
      {
        icon   : (<i className='fa fa-phone' />),
        symbol : 'Call',
        action : 'call'
      },
      {
        symbol : '+'
      },
      {
        icon   : (<i className='fa fa-remove' />),
        symbol : 'Hangup',
        action : 'hangup'
      }*/
    ];

    var dialButtons = [];
    buttons.map((button, i) => (
      dialButtons.push(
        <li onClick={() => onClick(button)} style={{
          'float' : 'left', 
          'cursor' : 'pointer',
          'width' : 'calc(100%/3)'
        }} key={i}>
          <DialButton {...button} compact={compact} />
        </li>
      )
    ));
    return (
      <ol style={{
        'margin' : 0,
        'padding' : 0,
        'listStyle' : 'none'
      }}>
        { dialButtons }
      </ol>
    );
  }

  render() {
    return (
      <div style={{
        'height': '453px',
        'margin-bottom': '94px'
      }}>
        <div style={{
          'float' : 'left', 
          'display' : 'block', 
          'width' : '100%',
          'WebkitTouchCallout' : 'none',
          'WebkitUserSelect' : 'none',
          'KhtmlUserSelect' : 'none',
          'MozUserSelect' : 'none',
          'MsUserSelect' : 'none',
          'userSelect' : 'none',
          'background' : '#1d1918',
          'fontFamily' : '"Lucida Grande", Tahoma, Arial, Verdana, sans-serif'
        }}>
          {this.createButtons()}
        </div>
      </div>
    );
  }
}
