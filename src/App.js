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
    BooksAPI.update(data.book, data.shelf)
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

  addToShelf = (data) => {
    BooksAPI.update(data.book, data.shelf)
      .then(response => {
        const shelves = Object.getOwnPropertyNames(response);
        const booksCopy = this.state.books;

        booksCopy.push({
          ...data.book,
          shelf: data.shelf,
        });

        shelves.forEach(shelf => {
          response[shelf].forEach(bookId => {
            const currentBook = booksCopy.find(book => book.id === bookId);

            currentBook.shelf = shelf;
          });
        });

        this.setState({ books: booksCopy });
      });
  }

  search = (query) => {
    const { books } = this.state;

    return BooksAPI.search(query)
      .then(response => {
        let results = response && !response.error ? response : [];

        if (results.length > 0) {
          results = results.map(resultBook => {
            const resultBookCopy = resultBook;
            const exists = books.find(book => book.id === resultBook.id);

            if (exists) {
              resultBookCopy.shelf = exists.shelf;
            }

            return resultBookCopy;
          })
          // books.forEach(book => {
          //   results = results.find(resultBook => resultBook.id !== book.id);
          // });
        }

        return results;
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
        <Route path="/search" render={() => (
          <SearchComponent
            add={this.addToShelf}
            books={this.state.books}
            search={this.search}
          />
        )} />
      </div>
    );
  }
}

export default BooksApp
