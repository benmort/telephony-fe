import React, { Component } from 'react';
import Dial from './components/Dial'
import './App.css';

class App extends Component {
  render() {
    return (
		<div style={{
				'width': '292px',
				'height': '600px',				
				'background-image': 'url(/apple-iphone6-spacegrey-portrait.png)',
				'background-position': '-215px -61px',
				'margin': '10px auto'
			}}
		>
			<div className="App"  style={{
				'width': '300px',
				'margin': '0 auto'
			}}/>
	        <Dial />
      </div>
    );
  }
}

export default App;
