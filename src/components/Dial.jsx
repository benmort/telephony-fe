import React    from 'react'
import ReactDOM from 'react-dom'
import DialPad from './DialPad'

export default class Dial extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value : '',
      words : {},
      wordCount : 0,
      capture : true,
      compact : false
    }
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }
  isCompact() {
    const container = ReactDOM.findDOMNode(this.refs.container)
    return container ? container.getBoundingClientRect().width < 540 : false
  }
  handleResize(e) {
    const { compact } = this.state
    if (this.isCompact()) {
      if (!compact) {
        this.setState({compact: true})
      }
    } else {
      if (compact) {
        this.setState({compact: false})
      }
    }
  }
  handleClick(button) {
    const { value } = this.state
    if (!button.action) {
      this.setState({
        value : value + button.symbol
      });
      if (button.symbol != '1' && button.symbol != '0' && button.symbol != '') {
        this.requestWordMapping(value + button.symbol);
      }
    } else if ('call' === button.action) {
      console.log(`Call number ${value}`)
    } else if ('hangup' === button.action) {
      console.log('Hangup call')
    }
  }
  handleKeyPress(e) {
    const { capture, value } = this.state
    if (!capture) {
      return
    }
    switch (e.charCode) {
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
      case 42:
      case 43:
        this.setState({
          value : value + String.fromCharCode(e.charCode)
        })
        if (e.charCode != 48 && e.charCode != 49) {
          this.requestWordMapping(value + String.fromCharCode(e.charCode));
        }
        break
      default:
        break
    }
  }
  componentDidMount() {
    window.addEventListener('keypress', this.handleKeyPress)
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }
  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeyPress)
    window.removeEventListener('resize', this.handleResize)
  }
  beginCapture(e) {
    this.setState({
      capture : true
    })
  }
  endCapture(e) {
    this.setState({
      capture : false
    })
  }
  reset() {
    this.setState({
      value : '',
      words : '',
      wordCount: 0
    })
  }
  handleChange(e) {
    const { capture } = this.state
    if (!capture) {
      this.setState({
        value : e.target.value
      })
    }
  }
  createWordBlocks() {
    var wordBlocks = [];
    if (this.state.words.length > 0) {
      for (var i = 0; i < this.state.words.length; i++){
          var word = this.state.words[i];
          for (var key in word){
              var attrName = key;
              var attrValue = word[key];
              wordBlocks.push(
                <div style={{
                  'float' : 'left', 
                  'height' : '20px',
                  'padding': '5px',
                  'margin': '5px',
                  'border': '1px solid black'
                }} key={i}>
                  {word}
                </div>
              )
          }
      }
    }
    return wordBlocks;
  }

  requestWordMapping(value) {
    var length = value.length,
      commaSeparatedValue = '',
      i = 0;
    while (i < length) {
      if (value[i] != '0' && value[i] != '1') {
        commaSeparatedValue += value[i];
        if (i != length - 1) {
          commaSeparatedValue += ',';
        }
      }
      i++;
    }
    return fetch('https://telephony-be.herokuapp.com/permutations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        telephone_number: commaSeparatedValue
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        words : responseJson,
        wordCount: responseJson.length
      })
    })
  }
  render() {
    const { value, compact } = this.state
    return (
      <div ref='container' style={{
        'padding': '19px',
        'padding-top': '73px'
      }}>
        {!!value && (
          <a 
            href='#' 
            onClick={this.reset.bind(this)} 
            style={{
              'padding'        : '5px 14px',
              'fontWeight'     : 'bold',
              'float'          : 'right',
              'textAlign'      : 'right',
              'marginTop'      : '29px',
              'fontSize'       : '30px',
              'textDecoration' : 'none',
              'color'          : '#4d4d4d'
            }}>&times;</a>
        )}
        <input 
          style={{
          'border'      : 'none',
          'float'       : 'left', 
          'display'     : 'block', 
          'width'       : '70%',
          'fontSize'    : compact ? '24px' : '40px',
          'minHeight'   : '47px',
          'margin'      : '29px 0',
          'color'       : '#4d4d4d',
          'padding'     : '0 5%'
        }} 
          onChange={this.handleChange.bind(this)}
          onFocus={this.endCapture.bind(this)}
          onBlur={this.beginCapture.bind(this)}
          type='text'
          value={value} />
        <DialPad onClick={this.handleClick.bind(this)} compact={compact} />
        <div>
          <p>
            { this.state.wordCount } words
          </p>
          <p>
            { this.createWordBlocks() }
          </p>
        </div>
      </div>
    )
  }
}
