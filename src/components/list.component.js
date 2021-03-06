import React, { Component } from 'react';
import BookComponent from './book.component';
import { Link } from 'react-router-dom';
class ListComponent extends Component {
  renderList = (listName) => {
    const titles = {
      'currentlyReading': 'Currently Reading',
      'wantToRead': 'Want to Read',
      'read': 'Read',
    };
    const {
      books,
      move,
    } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {titles[listName]}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter(book => book.shelf === listName).map(book => (
              <BookComponent
                book={book}
                key={book.id}
                move={move}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.renderList('currentlyReading')}
            {this.renderList('wantToRead')}
            {this.renderList('read')}
          </div>
        </div>
        <div className="open-search">
          <Link
            to="/search"
          >
            Add a book
          </Link>
        </div>
      </div>
    );
  }
}

export default ListComponent;
