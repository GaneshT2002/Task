import React, { Component } from 'react';

export default class Thin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      printText: '',  // State to hold the text input
      responseText: '' // State to hold the response data from the backend
    };
  }

  handleTextChange = (event) => {
    this.setState({ printText: event.target.value });
  };

  handlePrint = () => {
    const { printText } = this.state;
    
    fetch('http://192.168.2.12:8081/api/print', {
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
        this.setState({ responseText: data }); // Update state with response data
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleCashDrawer = () => {
    fetch('http://192.168.2.12:8081/api/cash-drawer', {
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
        this.setState({ responseText: data }); // Update state with response data
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center'
    };

    const buttonStyle = {
      margin: '5px'
    };

    return (
      <div style={containerStyle}>
        <textarea
          value={this.state.printText}
          onChange={this.handleTextChange}
          rows="4"
          cols="50"
          placeholder="Enter text to print..."
        />
        <div>
          <button onClick={this.handlePrint} style={buttonStyle}>Print</button>
          <button onClick={this.handleCashDrawer} style={buttonStyle}>Cash Drawer</button>
        </div>
        {this.state.responseText && <h1>{this.state.responseText}</h1>} {/* Display response data */}
      </div>
    );
  }
}
