import React from 'react'
import { Route } from 'react-router-dom';
// import * as BooksAPI from './BooksAPI'
import './App.css'

// components import
import ListComponent from './components/list.component';
import SearchComponent from './components/search.component';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={ListComponent} />
        <Route path="/search" component={SearchComponent} />
      </div>
    );
  }
}

export default BooksApp
