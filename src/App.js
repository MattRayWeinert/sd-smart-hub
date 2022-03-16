import './App.css';
import React, { Component } from 'react';
import Home from './pages/home';

class App extends Component {

  constructor(props) {
    super(props);
  }
  
  render()
  {
    return (
      <div className="App">
        <Home></Home>
      </div>
    )
  }
}
export default App;
