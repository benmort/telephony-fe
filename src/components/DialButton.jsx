import React    from 'react'
import ReactDOM from 'react-dom'

export default class DialButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active : false
    }
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }
  handleMouseDown(e) {
    this.setState({active: true})
  }
  handleMouseUp(e) {
    if (this.state.active) {
      this.setState({active: false})
    }
  }
  componentDidMount() {
    const element = ReactDOM.findDOMNode(this.refs.button)
    element.addEventListener('mousedown', this.handleMouseDown)
    window.addEventListener('mouseup', this.handleMouseUp)
  }
  componentWillUnmount() {
    const element = ReactDOM.findDOMNode(this.refs.button)
    element.removeEventListener('mousedown', this.handleMouseDown)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }
  render() {
    const { symbol, alias, icon, compact } = this.props
    const { active } = this.state
    return (
      <p ref='button' style={{
        'borderWidth'       : '1px',
        'borderStyle'       : 'solid',
        'borderColor'       : '#4d4d4d #000 #000 #4d4d4d',
        'color'             : '#fff',
        'fontSize'          : '30px',
        'padding'           : '25px 5px',
        'margin'            : 0,
        'backgroundColor'   : active ? '#00caf2' : 'transparent' 
      }}>
        <strong style={{
          'marginRight'     : '5px'
        }}>
          {icon}
          {(!icon || !compact) && (
            <span>&nbsp;{symbol}</span>
          )}
        </strong>
        <sup style={{
          'textTransform' : 'uppercase',
          'color'         : '#c1c1c1',
          'fontSize'      : '50%'
        }}>{alias}</sup>
      </p>
    )
  }
}
