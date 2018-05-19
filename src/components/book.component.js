import React from 'react';

const BookComponent = ({ book, move }) => (
  <li>
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            backgroundImage: `url('${book.imageLinks && book.imageLinks.smallThumbnail}')`,
            height: 193,
            width: 128,
          }}
        />
        <div className="book-shelf-changer">
          <select
            onChange={(event) => {
              move({
                book,
                shelf: event.target.value,
              });
            }}
            defaultValue={book.shelf || 'none'}
          >
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">
        {book.title}
      </div>
      <div className="book-authors">
        {book.authors && book.authors.join(', ')}
      </div>
    </div>
  </li>
);

export default BookComponent;
