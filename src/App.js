import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'

// components import
import ListComponent from './components/list.component';
import SearchComponent from './components/search.component';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => this.setState({ books }));
  }

  moveToShelf = (data) => {
    BooksAPI.update(data.book, data.self)
      .then(data => {
        const shelves = Object.getOwnPropertyNames(data);
        const booksCopy = this.state.books;

        shelves.forEach(shelf => {
          data[shelf].forEach(bookId => {
            const currentBook = booksCopy.find(book => book.id === bookId);

            currentBook.shelf = shelf;
          });
        });

        this.setState({ books: booksCopy });
      });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListComponent
            books={this.state.books}
            move={this.moveToShelf}
          />
        )} />
        <Route path="/search" component={SearchComponent} />
      </div>
    );
  }
}

export default BooksApp
