import React, { Component } from 'react';

export default class Thin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      printText: '' // State to hold the text input
    };
  }

  handleTextChange = (event) => {
    this.setState({ printText: event.target.value });
  };

  handlePrint = () => {
    const { printText } = this.state;
    
    fetch('http://localhost:8080/api/print', {
      method: 'POST', // Use POST if the API expects that
      headers: {
        'Content-Type': 'application/json' // Adjusted to match API expectations
      },
      body: JSON.stringify({ text: printText }) // Sending text as JSON body
    })
      .then(response => {
        if (response.ok) {
          return response.text(); // Parsing the response as text
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        console.log('Print request successful:', data); // Logging text response
      })
      .catch(error => {
        console.error('Error with the print request:', error);
      });
  };

  handleCashDrawer = () => {
    fetch('http://localhost:8080/api/cash-drawer', {
      method: 'GET', // Assuming GET is correct for this request
      headers: {
        'Content-Type': 'text/plain' // Adjusting for text format
      }
    })
      .then(response => {
        if (response.ok) {
          return response.text(); // Parsing the response as text
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        console.log('Cash drawer request successful:', data); // Logging text response
      })
      .catch(error => {
        console.error('Error with the cash drawer request:', error);
      });
  };

  render() {
    return (
      <div>
        <textarea
          value={this.state.printText}
          onChange={this.handleTextChange}
          rows="4"
          cols="50"
          placeholder="Enter text to print..."
        />
        <br />
        <button onClick={this.handlePrint}>Print</button>
        <button onClick={this.handleCashDrawer}>Cash Drawer</button>
      </div>
    );
  }
}