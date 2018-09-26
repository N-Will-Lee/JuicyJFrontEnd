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
      categories: [],
      location: ''
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
    let mainComponent = "";
    console.log(this.props.location)
    switch(this.state.location){
      case "":
      mainComponent = <Main data = {this.state.data}
      categories={this.state.categories}
        selectCategory={this.selectCategory}
        getData={this.getData}/>;
        return mainComponent
        break;
      case "callback":
        mainComponent = <Callback />;
        break;
      case "secret":
        mainComponent = this.props.auth.isAuthenticated() ? <Secret data = {this.state.data}
        categories={this.state.categories}
        selectCategory={this.selectCategory}
        getData={this.getData} /> : <NotFound/>
        break;
      default:
        mainComponent = <Main data = {this.state.data}
        categories={this.state.categories}
        selectCategory={this.selectCategory}
        getData={this.getData} />;
      }

      return (
        <div className="App">
          <Header />
          {mainComponent}
          {/* <Main data = {this.state.data}
                categories={this.state.categories}
                selectCategory={this.selectCategory}
                getData={this.getData} /> */}
          <Footer />
        </div>
      ); 
    }
  }
    
    // return (
  //   <div className="App">
  //     <header>
        
  //     </header>
  //     {mainComponent}
  //   </div>
    
  // );

export default App;
