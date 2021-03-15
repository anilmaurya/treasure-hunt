import React, { Component } from 'react';
import Navbar from './Navbar';

class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="content">
          {this.props.children}
        </div>
        <div id="popup1" class="overlay">
          <div class="popup">
            <h2>How to Play</h2>
            <a class="close" href="#">&times;</a>
            <div class="content">
              <p>Treasure is hidden somewhere in the world </p>
              <p>Solve the puzzle to find place where treasure is hidden.  </p>
              <p>Look for treasure on that place,
                if you see treasure then click it and get your name added in hall of fame. </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;