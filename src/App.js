/*jshint trailing:false */

import React, { Component } from 'react';
/*jshint newcap:false */
import horizon from '@horizon/client';
/*jshint newcap:true */
import Logo from './Logo';
import './App.css';

const ho = horizon({host: '127.0.0.1:8181'});
ho.onReady(function() {
  document.querySelector('h1').innerHTML = 'Horizon is working!';
});
ho.connect();

// Create a "messages" collection
const chat = ho("messages");

class App extends Component {
  componentWillMount(): void {
    chat.fetch().subscribe(
      (items) => {
        items.forEach((item) => {
          // console.log(item);
          this.setState(item);
        })
      },
      (err) => {
        console.log(err);
      });
  }

  componentDidUpdate(): void {
    // console.log('componentDidUpdate');
  }

  render() {
    const blurb = (this.state && this.state.text) || 'nope';

    return (
      <div className="coasteasy">
        <div className="header">
          <div><Logo /></div>
          <h1>Hello World</h1>
        </div>

        <p>
          Yessir... {blurb}
        </p>
      </div>
    );
  }

}

export default App;
