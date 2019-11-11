import React from 'react';
import './App.css';
import api from "./api"


import Router from "./Router"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: []
    }
  }

  render() {
    return (
      <div className="App">
        <Router {...this.state} />
      </div>
    );
  }
  componentDidMount = async () => {
    try {

      let orders = await api.getOrders();
      this.setState({ orders: orders })
    }
    catch (ex) {
      console.log(ex);
    }

  }
}

export default App;
