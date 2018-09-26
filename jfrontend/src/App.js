import React, { Component } from 'react';
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Secret from './components/Secret.js';
import NotFound from './components/NotFound.js';
import Callback from './components/Callback.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      categories: []
    }
  }

  componentDidMount() {
    this.getData()
    this.getCategories()
  }

  

  getData = () => {
    fetch("https://j-j-data.herokuapp.com/") 
    .then(result => result.json())
    .then(result => this.setState({
      data: result.data
    }))
  }

  getCategories = () => {
    fetch(`http://j-j-data.herokuapp.com/categories`)
    .then(result => result.json())
    .then(result => this.setState({
      categories: result.data
    }))
  }

  selectCategory = (id) => {
    fetch(`http://j-j-data.herokuapp.com/${id}`)
    .then(result => result.json())
    .then(result => this.setState({
      data: result.data
    }))
  }

  render() {
    console.log(this.state.data)
    console.log(this.state.categories)
    return (
      <div className="App">
        <Header />
        <Main data = {this.state.data}
              categories={this.state.categories}
              selectCategory={this.selectCategory}
              getData={this.getData} />
        <Footer />
      </div>
    );
  }
  render() {
    let mainComponent = "";
    switch(this.props.location){
      case "":
        mainComponent = <Main {...this.props}/>;
        break;
      case "callback":
        mainComponent = <Callback />;
        break;
      case "secret":
        mainComponent = this.props.auth.isAuthenticated() ? <Secret {...this.props} /> : <NotFound/>
        break;
      default:
        mainComponent = <NotFound />;
      
    }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Securing Your React App With Auth0</h1>
      </header>
      {mainComponent}
    </div>
    
  );
}
}

export default App;
