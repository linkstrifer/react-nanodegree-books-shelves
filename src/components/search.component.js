import React, { Component } from 'react';
import * as BooksAPI from './../BooksAPI'
import { Link } from 'react-router-dom';
import BookComponent from './book.component';

class SearchComponent extends Component {
  state = {
    query: '',
    results: [],
  }

  search = (event) => {
    const query = event.target.value;

    this.setState({
      query,
    });

    if (query.length > 0) {
      this.props.search(query)
        .then(results => this.setState({ results }));
    } else {
      this.setState({
        results: [],
      });
    }
  }

  render() {
    const { search } = this;
    const {
      query,
      results,
    } = this.state;
    const { add } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={search}
              placeholder="Search by title or author"
              type="text"
              value={query}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results.map(book => (
              <BookComponent
                book={book}
                key={book.id}
                move={add}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchComponent;
